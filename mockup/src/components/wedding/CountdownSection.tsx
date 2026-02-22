import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WEDDING_DATE = new Date("2026-03-29T17:00:00").getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(WEDDING_DATE - now, 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CountdownSection = () => {
  const [time, setTime] = useState(getTimeLeft);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const boxes = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <section id="countdown" className="bg-wedding-cream py-20 md:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-serif-elegant text-lg tracking-[0.2em] uppercase text-muted-foreground">
          Thời gian đến ngày trọng đại
        </p>
        <div className="mt-10 grid grid-cols-4 justify-center gap-2 sm:gap-4 md:gap-8 max-w-md mx-auto md:max-w-none md:flex">
          {boxes.map((box) => (
            <div
              key={box.label}
              className="flex h-20 w-full flex-col items-center justify-center rounded-lg border border-wedding-gold-light bg-background shadow-sm sm:h-24 sm:w-24 md:h-32 md:w-32"
            >
              <span className="font-serif-display text-3xl font-bold text-wedding-gold md:text-4xl">
                {String(box.value).padStart(2, "0")}
              </span>
              <span className="mt-1 text-xs tracking-widest uppercase text-muted-foreground">
                {box.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
