import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.loop = true;
    audio.volume = 0.3;

    // Try auto-play on first user interaction
    const handleFirstInteraction = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        // Remove listeners after successful play
        document.removeEventListener("click", handleFirstInteraction);
        document.removeEventListener("touchstart", handleFirstInteraction);
        document.removeEventListener("scroll", handleFirstInteraction);
      } catch (error) {
        console.log("Auto-play failed, waiting for interaction");
      }
    };

    // Try immediate play first
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // If blocked, wait for user interaction
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
      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-24 z-[2000] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isPlaying
            ? "bg-wedding-gold text-white hover:bg-wedding-gold/90"
            : "bg-white text-wedding-gold hover:bg-gray-100"
        }`}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        {isPlaying ? (
          <Volume2 size={24} className="animate-pulse" />
        ) : (
          <VolumeX size={24} />
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;
