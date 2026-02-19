import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionDivider from "./SectionDivider";
import { MapPin, Clock, Calendar, Shirt } from "lucide-react";

const events = [
  {
    title: "Bữa cơm thân mật",
    date: "Thứ Bảy, 28 tháng 3 năm 2026",
    lunarDate: "Tức ngày 10 tháng 02 năm Bính Ngọ",
    time: "17:00",
    venue: "Nhà gái",
    address: "Cạnh trường Tiểu học Thiệu Long, thôn Phú Lai, huyện Thiệu Hoá, Thanh Hoá",
    dress: "Trang phục lịch sự, thoải mái",
    icon: "🍽️",
  },
  {
    title: "Lễ Ăn Hỏi & Thành Hôn",
    date: "Chủ Nhật, 29 tháng 3 năm 2026",
    lunarDate: "Tức ngày 11 tháng 02 năm Bính Ngọ",
    time: "17:00",
    venue: "Trung tâm tiệc cưới Hội nghị Mipec Palace - Sảnh tầng 3",
    address: "Số 229 Tây Sơn, Phường Kim Liên, Hà Nội",
    dress: "Trang phục lịch thiệp",
    icon: "💒",
  },
];

const EventsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="events" className="py-20 md:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center">
          <p className="font-serif-elegant text-lg tracking-[0.2em] uppercase text-muted-foreground">
            Sự kiện
          </p>
          <h2 className="mt-2 font-serif-display text-3xl font-bold md:text-4xl">
            Thời gian & Địa điểm
          </h2>
          <SectionDivider />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {events.map((event) => (
            <div
              key={event.title}
              className="rounded-xl border border-wedding-gold-light bg-background p-8 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-4xl">{event.icon}</span>
              <h3 className="mt-4 font-serif-display text-2xl font-semibold">{event.title}</h3>
              <div className="mx-auto mt-4 h-px w-12 bg-wedding-gold-light" />

              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-wedding-gold" />
                    <span>{event.date}</span>
                  </div>
                  <span className="text-xs opacity-70">({event.lunarDate})</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock size={16} className="text-wedding-gold" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={16} className="text-wedding-gold" />
                  <span>{event.venue}</span>
                </div>
                <p className="text-xs opacity-70">{event.address}</p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Shirt size={16} className="text-wedding-gold" />
                  <span className="italic">{event.dress}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
