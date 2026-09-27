import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PHOTOS_DIR = './public/photos';
const OPTIMIZED_DIR = './public/photos-optimized';

// Configuration for different image types
const CONFIG = {
  hero: {
    // Full-width hero images
    desktop: { width: 1920, quality: 80 },
    mobile: { width: 768, quality: 75 },
  },
  portrait: {
    // Portrait images in couple section
    width: 600,
    quality: 80,
  },
  gallery: {
    // Gallery thumbnails
    thumbnail: { width: 400, quality: 75 },
    // Full size for lightbox
    full: { width: 1200, quality: 80 },
  },
  photobooth: {
    width: 800,
    quality: 80,
  },
};

// Map original files to their optimization config
const FILE_CONFIGS = {
  // Hero images (desktop)
  'thaprua-main.jpg': { type: 'hero', variant: 'desktop' },
  'studio-main-1.jpg': { type: 'hero', variant: 'desktop' },
  'thaprua-film.jpg': { type: 'hero', variant: 'desktop' },

  // Portrait images
  'lam-portrait.JPG': { type: 'portrait' },
  'hoang-portrait.JPG': { type: 'portrait' },

  // Duo images (treat as gallery full)
  'duo-hanoimoi.JPG': { type: 'gallery', variant: 'full' },
  'duo-hanoimoi-2.JPG': { type: 'gallery', variant: 'full' },
  'kiss-studio-main.JPG': { type: 'gallery', variant: 'full' },

  // Photobooth
  'photobooth1.jpeg': { type: 'photobooth' },
  'photobooth2.jpeg': { type: 'photobooth' },
};

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function optimizeImage(inputPath, outputPath, options) {
  const { width, quality } = options;

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Only resize if image is larger than target
    const resizeOptions = metadata.width > width ? { width, withoutEnlargement: true } : {};

    // Create JPEG version
    await image
      .resize(resizeOptions)
      .jpeg({ quality, mozjpeg: true })
      .toFile(outputPath.replace(/\.(jpg|jpeg|JPG|JPEG)$/i, '.jpg'));

    // Create WebP version
    await sharp(inputPath)
      .resize(resizeOptions)
      .webp({ quality })
      .toFile(outputPath.replace(/\.(jpg|jpeg|JPG|JPEG)$/i, '.webp'));

    const originalStats = await fs.stat(inputPath);
    const optimizedStats = await fs.stat(outputPath.replace(/\.(jpg|jpeg|JPG|JPEG)$/i, '.jpg'));

    const savings = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
    console.log(`✓ ${path.basename(inputPath)}: ${(originalStats.size / 1024 / 1024).toFixed(2)}MB → ${(optimizedStats.size / 1024).toFixed(0)}KB (${savings}% smaller)`);

    return true;
  } catch (err) {
    console.error(`✗ Error optimizing ${inputPath}:`, err.message);
    return false;
  }
}

async function processRootPhotos() {
  console.log('\n📸 Processing root photos...\n');

  await ensureDir(OPTIMIZED_DIR);

  const files = await fs.readdir(PHOTOS_DIR);

  for (const file of files) {
    const filePath = path.join(PHOTOS_DIR, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) continue;
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const config = FILE_CONFIGS[file];
    if (!config) {
      console.log(`⚠ Skipping ${file} (no config)`);
      continue;
    }

    let options;
    if (config.type === 'hero') {
      options = CONFIG.hero[config.variant];
    } else if (config.type === 'portrait') {
      options = CONFIG.portrait;
    } else if (config.type === 'gallery') {
      options = CONFIG.gallery[config.variant];
    } else if (config.type === 'photobooth') {
      options = CONFIG.photobooth;
    }

    const outputPath = path.join(OPTIMIZED_DIR, file);
    await optimizeImage(filePath, outputPath, options);
  }
}

async function processMobileHeroImages() {
  console.log('\n📱 Processing mobile hero images...\n');

  const mainDir = path.join(PHOTOS_DIR, 'main');
  const outputDir = path.join(OPTIMIZED_DIR, 'main');

  await ensureDir(outputDir);

  const files = await fs.readdir(mainDir);

  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const inputPath = path.join(mainDir, file);
    const outputPath = path.join(outputDir, file);

    await optimizeImage(inputPath, outputPath, CONFIG.hero.mobile);
  }
}

async function processAlbumImages() {
  console.log('\n🖼 Processing album images...\n');

  const albumDir = path.join(PHOTOS_DIR, 'album');
  const outputDir = path.join(OPTIMIZED_DIR, 'album');
  const thumbDir = path.join(OPTIMIZED_DIR, 'album', 'thumbnails');

  await ensureDir(outputDir);
  await ensureDir(thumbDir);

  const files = await fs.readdir(albumDir);

  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const inputPath = path.join(albumDir, file);

    // Create full-size optimized version
    console.log(`  Full: ${file}`);
    await optimizeImage(inputPath, path.join(outputDir, file), CONFIG.gallery.full);

    // Create thumbnail
    console.log(`  Thumb: ${file}`);
    await optimizeImage(inputPath, path.join(thumbDir, file), CONFIG.gallery.thumbnail);
  }
}

async function processQRImages() {
  console.log('\n📱 Processing QR images...\n');

  const qrDir = path.join(PHOTOS_DIR, 'qr');
  const outputDir = path.join(OPTIMIZED_DIR, 'qr');

  await ensureDir(outputDir);

  try {
    const files = await fs.readdir(qrDir);

    for (const file of files) {
      if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

      const inputPath = path.join(qrDir, file);
      const outputPath = path.join(outputDir, file);

      // QR codes should be crisp, use PNG
      await sharp(inputPath)
        .resize({ width: 300, withoutEnlargement: true })
        .png({ quality: 90 })
        .toFile(outputPath.replace(/\.(jpg|jpeg|JPG|JPEG)$/i, '.png'));

      console.log(`✓ ${file}`);
    }
  } catch (err) {
    console.log('No QR directory found, skipping...');
  }
}

async function createSummary() {
  console.log('\n📊 Calculating savings...\n');

  async function getDirSize(dir) {
    let size = 0;
    try {
      const files = await fs.readdir(dir, { withFileTypes: true });
      for (const file of files) {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
          size += await getDirSize(filePath);
        } else {
          const stat = await fs.stat(filePath);
          size += stat.size;
        }
      }
    } catch {
      // Ignore errors
    }
    return size;
  }

  const originalSize = await getDirSize(PHOTOS_DIR);
  const optimizedSize = await getDirSize(OPTIMIZED_DIR);

  console.log('='.repeat(50));
  console.log(`Original photos:  ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized photos: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total savings:    ${((1 - optimizedSize / originalSize) * 100).toFixed(1)}%`);
  console.log('='.repeat(50));
}

async function main() {
  console.log('🚀 Starting image optimization...\n');

  await processRootPhotos();
  await processMobileHeroImages();
  await processAlbumImages();
  await processQRImages();
  await createSummary();

  console.log('\n✅ Done! Optimized images are in ./public/photos-optimized/');
  console.log('\nNext steps:');
  console.log('1. Update your components to use /photos-optimized/ paths');
  console.log('2. Use WebP with JPEG fallback for best compatibility');
  console.log('3. Consider using <picture> element for responsive images');
}

main().catch(console.error);
