import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionDivider from "./SectionDivider";
import { Facebook, X } from "lucide-react";

const brideImg = "/photos/lam-portrait.JPG";
const groomImg = "/photos/hoang-portrait.JPG";

const CoupleSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <section id="couple" className="py-20 md:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center">
          <p className="font-serif-elegant text-lg tracking-[0.2em] uppercase text-muted-foreground">
            Cặp đôi HoLa
          </p>
          <h2 className="mt-2 font-serif-display text-3xl font-bold text-foreground md:text-4xl">
            Những nhân vật chính
          </h2>
          <SectionDivider />
        </div>

        <div className="mt-8 grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24 max-w-4xl mx-auto">
          {/* Bride */}
          <div className="flex flex-col items-center text-center">
            <button
              onClick={() => setLightboxImg(brideImg)}
              className="h-56 w-56 overflow-hidden rounded-full border-4 border-wedding-gold-light shadow-lg transition-transform hover:scale-105 md:h-64 md:w-64 cursor-pointer"
            >
              <img src={brideImg} alt="Cô dâu" className="h-full w-full object-cover object-top scale-125" />
            </button>
            <h3 className="mt-6 font-serif-display text-2xl font-semibold">Lê Thị Thanh Lam</h3>
            <p className="mt-1 font-serif-elegant text-base italic text-wedding-gold">Cô dâu</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Con gái của ông Lê Văn Chiến và bà Dương Thị Liên
            </p>
            {/* <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Cử nhân tốt nghiệp ngành Luật Kinh tế, Đại học Luật Hà Nội, chuyên viên C&B tại công ty Tài chính TNHH MB Shinsei (thương hiệu Mcredit)
            </p> */}
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground italic">
              "Cô ấy là người con gái vui vẻ, hoà đồng và lúc nào cũng lan toả nguồn năng lượng tích cực đến mọi người xung quanh! Bật mí là nấu ăn rất ngon, hát hay và chơi cầu lông giỏi"
            </p>
            <div className="mt-4 flex gap-3 text-muted-foreground">
              <a href="https://www.facebook.com/Lam1009" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-wedding-gold"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Groom */}
          <div className="flex flex-col items-center text-center">
            <button
              onClick={() => setLightboxImg(groomImg)}
              className="h-56 w-56 overflow-hidden rounded-full border-4 border-wedding-gold-light shadow-lg transition-transform hover:scale-105 md:h-64 md:w-64 cursor-pointer"
            >
              <img src={groomImg} alt="Chú rể" className="h-full w-full object-cover" />
            </button>
            <h3 className="mt-6 font-serif-display text-2xl font-semibold">Nguyễn Văn Hoàng</h3>
            <p className="mt-1 font-serif-elegant text-base italic text-wedding-gold">Chú rể</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Con trai của ông Nguyễn Văn Long và bà Nguyễn Thị Huyền
            </p>
            {/* <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Đảng viên dự bị, cử nhân song bằng CNTT và Cơ điện tử, thạc sĩ khoa học, trưởng nhóm lập trình phần mềm ứng dụng tại TT R&D Digital - Công ty Cổ phần bóng đèn Phích nước Rạng Đông
            </p> */}
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground italic">
              "Anh ấy là người đàn ông trầm tính nhưng sâu sắc, đam mê thể thao, có tinh thần trách nhiệm và luôn hết mình với mọi việc. Một người bạn đời đáng tin cậy mà Lam có thể dựa vào."
            </p>
            <div className="mt-4 flex gap-3 text-muted-foreground">
              <a href="https://www.facebook.com/hoang.nguyen.van.0402/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-wedding-gold"><Facebook size={18} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Đóng"
          >
            <X size={24} />
          </button>
          <img
            src={lightboxImg}
            alt="Full size"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default CoupleSection;
