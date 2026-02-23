import { useState, useEffect } from "react";

interface Wish {
  name: string;
  wishes: string;
}

const DEFAULT_WISHES: Wish[] = [
  { name: "Gia đình", wishes: "Chúc hai con trăm năm hạnh phúc, sớm có tin vui!" },
  { name: "Bạn bè", wishes: "Chúc mừng HoLa! Hạnh phúc mãi mãi nhé!" },
];

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

const FloatingWishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const fetchWishes = async () => {
      if (!GOOGLE_SCRIPT_URL) return;
      
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "GET",
          redirect: "follow",
        });
        
        const text = await response.text();
        console.log("API Response:", text);
        
        try {
          const data = JSON.parse(text);
          console.log("Parsed wishes:", data.wishes);
          if (data.wishes && data.wishes.length > 0) {
            setWishes(data.wishes);
          }
        } catch (parseError) {
          console.log("Response không phải JSON:", text);
        }
      } catch (error) {
        // Lỗi fetch, giữ nguyên default wishes
      }
    };

    fetchWishes();
    const fetchInterval = setInterval(fetchWishes, 60000);
    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    if (wishes.length === 0 || isDismissed) return;

    // Hiển thị từng lời chúc một lần duy nhất
    const showWish = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          // Chuyển sang lời chúc tiếp theo
          if (currentIndex < wishes.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            // Đã hiển thị hết, tự động ẩn
            setIsDismissed(true);
          }
        }, 500);
      }, 5000);
    };

    showWish();
  }, [wishes.length, currentIndex, isDismissed]);

  if (wishes.length === 0 || isDismissed) return null;

  const currentWish = wishes[currentIndex];

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div
      className={`fixed bottom-24 left-4 z-[1500] max-w-xs transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative rounded-2xl border border-wedding-gold/20 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
        <button
          onClick={handleDismiss}
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300 hover:text-gray-700"
          aria-label="Đóng"
        >
          ✕
        </button>
        <div className="flex items-start gap-3">
          <span className="text-2xl">💌</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-wedding-gold">
              {currentWish?.name || "Khách mời"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
              "{currentWish?.wishes || "Chúc mừng hạnh phúc!"}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingWishes;
