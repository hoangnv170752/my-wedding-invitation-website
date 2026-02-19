import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionDivider from "./SectionDivider";
import { Heart } from "lucide-react";

const milestones = [
  {
    date: "Tháng 6, 2024",
    title: "Lần đầu gặp nhau",
    description: "Cuộc hẹn đầu tiên đáng nhớ, Hoàng mặc quần short dẫn Kem đi gặp Lam. Một buổi tối tháng 6 đơn giản nhưng đã để lại dấu ấn sâu đậm trong trái tim của cả hai."
  },
  {
    date: "Tháng 7, 2024",
    title: "Lời tỏ tình tại quán cafe",
    description: "Hoàng đã chính thức tỏ tình với Lam tại quán cafe gần nhà. Một lời tỏ tình chân thành và ngọt ngào đã mở ra hành trình tình yêu của hai người."
  },
  {
    date: "Tháng 9, 2024",
    title: "Lần đầu về thăm nhà",
    description: "Hoàng lần đầu tiên đến thăm nhà Thanh Lam tại Thiệu Hoá, gặp gỡ gia đình và nhận được sự đón nhận ấm áp từ phía nhà gái."
  },
  {
    date: "Tháng 2, 2025",
    title: "Đón tết và sinh nhật cùng nhau",
    description: "Hai người cùng nhau đón Tết Nguyên Đán và kỷ niệm sinh nhật tại Thiệu Hoá, tận hưởng những khoảnh khắc ấm áp bên gia đình và người thương."
  },
  {
    date: "Tháng 4, 2025",
    title: "Chuyến du lịch Huế",
    description: "Chuyến du lịch đầu tiên cùng nhau đến cố đô Huế, khám phá vẻ đẹp văn hóa và tạo nên những kỷ niệm đáng nhớ trong hành trình tình yêu."
  },
  {
    date: "Tháng 9, 2025",
    title: "Lời cầu hôn tại Đà Nẵng",
    description: "Trong chuyến du lịch Đà Nẵng, Hoàng đã quỳ gối cầu hôn Lam trên Sun Wheel - trong ngày cuối hoạt động. Một khoảnh khắc lãng mạn và cảm động đánh dấu bước ngoặt quan trọng trong cuộc đời hai người."
  },
  {
    date: "Tháng 10, 2025",
    title: "Lễ dạm ngõ",
    description: "Lễ dạm ngõ trang trọng được tổ chức tại nhà Thanh Lam, đánh dấu sự gắn kết chính thức giữa hai gia đình và chuẩn bị cho hôn lễ sắp tới."
  },
];

const TimelineItem = ({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex w-full transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isLeft ? "md:justify-start" : "md:justify-end"}`}
    >
      {/* Dot on timeline */}
      <div className="absolute left-4 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-wedding-gold text-white shadow md:left-1/2 md:-translate-x-1/2">
        <Heart size={14} />
      </div>

      {/* Card */}
      <div
        className={`ml-16 w-full rounded-lg border border-wedding-gold-light bg-background p-6 shadow-sm md:ml-0 md:w-5/12 ${
          isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
        }`}
      >
        <span className="font-serif-elegant text-sm tracking-widest uppercase text-wedding-gold">
          {milestone.date}
        </span>
        <h3 className="mt-2 font-serif-display text-xl font-semibold">{milestone.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{milestone.description}</p>
      </div>
    </div>
  );
};

const StorySection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="story" className="bg-wedding-cream py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-serif-elegant text-lg tracking-[0.2em] uppercase text-muted-foreground">
            Về chúng tôi
          </p>
          <h2 className="mt-2 font-serif-display text-3xl font-bold md:text-4xl">Câu chuyện tình iu</h2>
          <SectionDivider />
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-8 max-w-4xl space-y-12">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-wedding-gold-light md:left-1/2 md:-translate-x-px" />

          {milestones.map((m, i) => (
            <TimelineItem key={i} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
