import { useState, useEffect, useRef } from "react";

interface FireworksInstance {
  start: () => void;
  stop: () => void;
}

const FireworksToggle = () => {
  const [isActive, setIsActive] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<FireworksInstance | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import("masax-fireworks-js-animation").then((module: Record<string, any>) => {
      const Fireworks = module.Fireworks || module.default;
      fireworksRef.current = new Fireworks(canvas, {
        hue: { min: 0, max: 360 },
        particles: 50,
        friction: 0.95,
        gravity: 1.5,
        acceleration: 1.05,
      });

      fireworksRef.current?.start();
      setIsReady(true);
    });

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      fireworksRef.current?.stop();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isReady || !fireworksRef.current) return;
    
    if (isActive) {
      fireworksRef.current.start();
    } else {
      fireworksRef.current.stop();
    }
  }, [isActive, isReady]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[1000]"
      />
      <button
        onClick={() => setIsActive(!isActive)}
        className={`fixed bottom-6 right-6 z-[2000] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isActive
            ? "bg-wedding-gold text-white hover:bg-wedding-gold/90"
            : "bg-white text-wedding-gold hover:bg-gray-100"
        }`}
        aria-label={isActive ? "Tắt pháo hoa" : "Bật pháo hoa"}
        title={isActive ? "Tắt pháo hoa" : "Bật pháo hoa"}
      >
        <span className={`text-3xl ${isActive ? "animate-pulse" : ""}`}>🎆</span>
      </button>
    </>
  );
};

export default FireworksToggle;
