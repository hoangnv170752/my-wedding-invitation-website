import { useState, useEffect, useCallback } from "react";
import { ChevronDown, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  "/photos/thaprua-main.jpg",
  "/photos/studio-main-1.jpg",
  "/photos/thaprua-film.jpg"
];

const mobileHeroImages = [
  "/photos/main/SMA_0255.JPG",
  "/photos/main/SMA_9357.JPG",
  "/photos/main/SMA_9565.JPG"
];

// Google Calendar event details
const createGoogleCalendarLink = () => {
  const eventDetails = {
    text: "Lễ Thành Hôn - Văn Hoàng & Thanh Lam",
    dates: "20260329T100000/20260329T140000", // 29/03/2026, 17:00 Vietnam time (UTC+7) = 10:00 UTC
    details: "Lễ thành hôn của Nguyễn Văn Hoàng và Lê Thị Thanh Lam",
    location: "Trung tâm tiệc cưới Hội nghị Mipec Palace - Sảnh tầng 3, Số 229 Tây Sơn, Phường Kim Liên, Hà Nội",
  };

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.text)}&dates=${eventDetails.dates}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`;
};

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const images = isMobile ? mobileHeroImages : heroImages;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Slider */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <img
            key={img}
            src={img}
            alt={`Wedding hero background ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Slider Controls */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 md:left-8"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30 md:right-8"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-white/50 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <p className="font-serif-elegant text-lg tracking-[0.3em] uppercase opacity-90 md:text-xl animate-fade-in">
          Save the Date
        </p>
        <h1 className="mt-4 font-serif-display text-5xl font-bold leading-tight md:text-7xl lg:text-8xl animate-fade-in-up">
          Văn Hoàng & Thanh Lam
        </h1>
        <div className="mx-auto mt-6 h-px w-24 bg-wedding-gold-light md:w-32" />
        <p className="mt-6 font-serif-elegant text-xl tracking-widest md:text-2xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Chủ Nhật, 29 tháng 3 năm 2026
        </p>
        <p className="mt-2 font-serif-elegant text-sm tracking-wider opacity-80 md:text-base animate-fade-in italic" style={{ animationDelay: "0.4s" }}>
          (Tức ngày 11 tháng 02 năm Bính Ngọ)
        </p>
        <p className="mt-3 font-serif-elegant text-base tracking-wider opacity-90 md:text-lg animate-fade-in" style={{ animationDelay: "0.5s" }}>
          17:00 - Trung tâm tiệc cưới Hội nghị Mipec Palace - Sảnh tầng 3
        </p>
        <p className="mt-1 font-serif-elegant text-sm tracking-wider opacity-70 md:text-base animate-fade-in" style={{ animationDelay: "0.6s" }}>
          Số 229 Tây Sơn, Phường Kim Liên, Hà Nội
        </p>
        <a
          href={createGoogleCalendarLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-6 py-3 font-serif-elegant text-sm tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white md:text-base animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <Calendar size={18} />
          Thêm vào lịch
        </a>
      </div>

      {/* Scroll indicator */}
      <a
        href="#countdown"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce-slow"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
};

export default HeroSection;
