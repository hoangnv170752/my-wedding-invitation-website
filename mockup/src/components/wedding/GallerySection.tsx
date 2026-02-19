import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionDivider from "./SectionDivider";
import { X } from "lucide-react";

const images = [
  "/photos/thaprua-main.jpg",
  "/photos/studio-main-1.jpg",
  "/photos/kiss-studio-main.JPG",
  "/photos/duo-hanoimoi.JPG",
  "/photos/duo-hanoimoi-2.JPG",
  "/photos/hoang-portrait.JPG",
];

const GallerySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <section id="gallery" className="bg-wedding-cream py-20 md:py-28">
        <div
          ref={ref}
          className={`container mx-auto px-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <p className="font-serif-elegant text-lg tracking-[0.2em] uppercase text-muted-foreground">
              Những chiếc ảnh cưới
            </p>
            <h2 className="mt-2 font-serif-display text-3xl font-bold md:text-4xl">Album ảnh cưới</h2>
            <SectionDivider />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 max-w-5xl mx-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-sm"
              >
                <img
                  src={img}
                  alt={`Gallery photo ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <img
            src={images[lightbox]}
            alt={`Gallery photo ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default GallerySection;
