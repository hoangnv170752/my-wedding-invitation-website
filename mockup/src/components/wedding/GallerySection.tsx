import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionDivider from "./SectionDivider";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const albumImages = [
  "/photos/album/SMA_9312.JPG",
  "/photos/album/SMA_9357.JPG",
  "/photos/album/SMA_9368.JPG",
  "/photos/album/SMA_9386.JPG",
  "/photos/album/SMA_9502.JPG",
  "/photos/album/SMA_9516.JPG",
  "/photos/album/SMA_9053.JPG",
  "/photos/album/SMA_9102.JPG",
  "/photos/album/SMA_8871.JPG",
  "/photos/album/SMA_9124.JPG",
  "/photos/album/SMA_9149.JPG",
  "/photos/album/SMA_9205.JPG",
  "/photos/album/SMA_9560.JPG",
  "/photos/album/SMA_9565.JPG",
  "/photos/album/SMA_9605.JPG",
  "/photos/album/SMA_9726.JPG",
  "/photos/album/SMA_9791.JPG",
  "/photos/album/SMA_9864.JPG",
  "/photos/album/SMA_0137.JPG",
  "/photos/album/SMA_0196.JPG",
  "/photos/album/SMA_0202.JPG",
  "/photos/album/SMA_0213.JPG",
  "/photos/album/SMA_0243.JPG",
  "/photos/album/SMA_0255.JPG",
  "/photos/album/000047.JPG",
  "/photos/album/000048.JPG",
  "/photos/album/000050.JPG",
  "/photos/album/000052.JPG",
  "/photos/album/000053.JPG",
  "/photos/album/000054.JPG",
];

const IMAGES_PER_PAGE = 6;

const GallerySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [currentPage, setCurrentPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const totalPages = Math.ceil(albumImages.length / IMAGES_PER_PAGE);

  const goToPrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const openLightbox = (globalIndex: number) => {
    setLightboxIndex(globalIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const lightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : albumImages.length - 1);
  };

  const lightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex < albumImages.length - 1 ? lightboxIndex + 1 : 0);
  };

  const currentImages = albumImages.slice(
    currentPage * IMAGES_PER_PAGE,
    (currentPage + 1) * IMAGES_PER_PAGE
  );

  return (
    <>
      <section id="gallery" className="bg-wedding-cream/50 py-20 md:py-28">
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
            <h2 className="mt-2 font-serif-display text-3xl font-bold text-foreground md:text-4xl">
              Album ảnh
            </h2>
            <SectionDivider />
          </div>

          {/* Gallery Grid */}
          <div className="relative mx-auto mt-10 max-w-5xl">
            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-wedding-gold hover:text-white md:-left-6"
              aria-label="Trang trước"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-wedding-gold hover:text-white md:-right-6"
              aria-label="Trang sau"
            >
              <ChevronRight size={24} />
            </button>

            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {currentImages.map((img, index) => {
                const globalIndex = currentPage * IMAGES_PER_PAGE + index;
                return (
                  <button
                    key={img}
                    onClick={() => openLightbox(globalIndex)}
                    className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl"
                  >
                    <img
                      src={img}
                      alt={`Ảnh cưới ${globalIndex + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-wedding-gold">
                        Xem rõ hơnn
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dots Indicator */}
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentPage
                      ? "w-6 bg-wedding-gold"
                      : "w-2 bg-wedding-gold/30 hover:bg-wedding-gold/50"
                  }`}
                  aria-label={`Trang ${index + 1}`}
                />
              ))}
            </div>

            {/* Page Counter */}
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Trang {currentPage + 1}
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Đóng"
          >
            <X size={24} />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              lightboxPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              lightboxNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            aria-label="Ảnh sau"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image */}
          <img
            src={albumImages[lightboxIndex]}
            alt={`Ảnh cưới ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
            {lightboxIndex + 1} / {albumImages.length}
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;
