import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Phone } from "lucide-react";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHotlineMenu, setShowHotlineMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.3;

    const handleFirstInteraction = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        document.removeEventListener("click", handleFirstInteraction);
        document.removeEventListener("touchstart", handleFirstInteraction);
        document.removeEventListener("scroll", handleFirstInteraction);
      } catch (error) {
        console.log("Auto-play failed, waiting for interaction");
      }
    };

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      document.addEventListener("click", handleFirstInteraction, { once: true });
      document.addEventListener("touchstart", handleFirstInteraction, { once: true });
      document.addEventListener("scroll", handleFirstInteraction, { once: true });
    });

    return () => {
      audio.pause();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/yes-i-do.mp3" preload="auto" />
      
      {/* Floating buttons container */}
      <div className="fixed bottom-6 right-6 z-[2000] flex flex-col items-end gap-3">
        {/* Hotline menu */}
        {showHotlineMenu && (
          <div className="mb-2 flex flex-col gap-2 rounded-lg bg-white p-3 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <a
              href="tel:0354530616"
              className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-wedding-gold/10"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                <Phone size={16} />
              </span>
              <div className="text-left">
                <div className="font-semibold">Chú rể - Hoàng</div>
                <div className="text-xs text-gray-500">0354530616</div>
              </div>
            </a>
            <a
              href="tel:0984924832"
              className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-wedding-gold/10"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white">
                <Phone size={16} />
              </span>
              <div className="text-left">
                <div className="font-semibold">Cô dâu - Lam</div>
                <div className="text-xs text-gray-500">0984924832</div>
              </div>
            </a>
          </div>
        )}

        {/* Buttons row */}
        <div className="flex items-center gap-3">
          {/* Music button */}
          <button
            onClick={toggleMusic}
            className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
              isPlaying
                ? "bg-wedding-gold text-white hover:bg-wedding-gold/90"
                : "bg-white text-wedding-gold hover:bg-gray-100"
            }`}
            aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
            title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
          >
            {isPlaying ? (
              <Volume2 size={20} className="animate-pulse" />
            ) : (
              <VolumeX size={20} />
            )}
          </button>

          {/* Hotline button with wave animation */}
          <button
            onClick={() => setShowHotlineMenu(!showHotlineMenu)}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:bg-green-600"
            aria-label="Hotline"
            title="Gọi điện"
          >
            {/* Wave animation rings */}
            <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="absolute inset-0 animate-pulse rounded-full bg-green-400 opacity-50" />
            <Phone size={20} className="relative z-10" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BackgroundMusic;
