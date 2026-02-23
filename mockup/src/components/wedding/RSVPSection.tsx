import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionDivider from "./SectionDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Gift } from "lucide-react";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

const RSVPSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    attendBride: false,
    attendGroom: false,
    notAttending: false,
    wishes: "",
    sentGift: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          relation: formData.relation,
          attendBride: formData.attendBride ? "Có" : "Không",
          attendGroom: formData.attendGroom ? "Có" : "Không",
          notAttending: formData.notAttending ? "Có" : "Không",
          wishes: formData.wishes,
          sentGift: formData.sentGift ? "Có" : "Không",
          timestamp: new Date().toLocaleString("vi-VN"),
        }),
      });

      setSubmitted(true);
      toast({
        title: "Đã gửi xác nhận! 🎉",
        description: "Cảm ơn bạn đã phản hồi. Hẹn gặp bạn tại buổi lễ!",
      });
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau hoặc liên hệ trực tiếp với cô dâu chú rể.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="rsvp" className="bg-wedding-cream py-20 md:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center">
          <p className="font-serif-elegant text-lg tracking-[0.2em] uppercase text-muted-foreground">
            Xác nhận tham dự
          </p>
          <h2 className="mt-2 font-serif-display text-3xl font-bold md:text-4xl">Gửi Lời Chúc</h2>
          <SectionDivider />
        </div>

        {/* Grid layout for RSVP Form and QR Codes */}
        <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Form RSVP */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl border border-wedding-gold/20 bg-white p-6 shadow-lg h-full">
              <div className="mb-6 text-center">
                <h3 className="font-serif-display text-xl font-semibold text-wedding-gold">Xác nhận tham dự</h3>
                <p className="mt-1 text-sm text-muted-foreground">Vui lòng cho chúng mình biết bạn có thể tham dự không</p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-10 text-center">
                  <span className="text-6xl">💌</span>
                  <h3 className="mt-4 font-serif-display text-2xl font-semibold text-green-700">
                    Cảm ơn {formData.name}!
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {formData.relation === "Gia đình" && "Gia đình là điều quý giá nhất. Cảm ơn bạn đã luôn bên cạnh chúng con!"}
                    {formData.relation === "Bạn bè" && "Bạn bè tốt là kho báu. Cảm ơn cậu đã đồng hành cùng cặp đôi HoLa!"}
                    {formData.relation === "Đồng nghiệp" && "Cảm ơn anh / chị đã dành thời gian quý báu để chúc phúc cho chúng em!"}
                    {formData.relation === "Khác" && "Cảm ơn cậu đã gửi lời chúc tốt đẹp đến cặp đôi HoLa!"}
                    <br />Hẹn gặp mọi người tại buổi lễ! 💕
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Họ và tên *</label>
                    <Input
                      name="name"
                      placeholder="Nhập họ và tên của bạn"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="border-wedding-gold-light focus-visible:ring-wedding-gold"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Quan hệ *</label>
                    <select
                      name="relation"
                      required
                      value={formData.relation}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-wedding-gold-light bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wedding-gold focus-visible:ring-offset-2"
                    >
                      <option value="" disabled>Chọn quan hệ với cô dâu / chú rể</option>
                      <option value="Gia đình">Gia đình</option>
                      <option value="Bạn bè">Bạn bè</option>
                      <option value="Đồng nghiệp">Đồng nghiệp</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">Xác nhận tham dự *</label>
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                        <input
                          type="checkbox"
                          name="notAttending"
                          checked={formData.notAttending}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-gray-500 focus:ring-gray-400"
                        />
                        <span>😢 Rất tiếc không thể tham dự</span>
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground">Tích chọn buổi lễ bạn sẽ tham gia</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-pink-200 bg-pink-50/50 p-3 transition-all hover:border-pink-400 hover:bg-pink-50 has-[:checked]:border-pink-500 has-[:checked]:bg-pink-100">
                        <input
                          type="checkbox"
                          name="attendBride"
                          checked={formData.attendBride}
                          onChange={handleChange}
                          className="h-5 w-5 rounded border-pink-300 text-pink-500 focus:ring-pink-500"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-pink-700">💗 Nhà gái</span>
                          <span className="text-xs text-pink-600">28/03 - Thiệu Hoá</span>
                        </div>
                      </label>
                      <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-blue-200 bg-blue-50/50 p-3 transition-all hover:border-blue-400 hover:bg-blue-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-100">
                        <input
                          type="checkbox"
                          name="attendGroom"
                          checked={formData.attendGroom}
                          onChange={handleChange}
                          className="h-5 w-5 rounded border-blue-300 text-blue-500 focus:ring-blue-500"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-blue-700">💙 Nhà trai</span>
                          <span className="text-xs text-blue-600">29/03 - Hà Nội</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Lời chúc</label>
                    <Textarea
                      name="wishes"
                      placeholder="Gửi lời chúc đến cặp đôi HoLa 💕"
                      rows={3}
                      value={formData.wishes}
                      onChange={handleChange}
                      className="border-wedding-gold-light focus-visible:ring-wedding-gold"
                    />
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-sm italic text-muted-foreground">
                    <input
                      type="checkbox"
                      name="sentGift"
                      checked={formData.sentGift}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-wedding-gold-light text-wedding-gold focus:ring-wedding-gold"
                    />
                    <span>🎁 Chúc cô dâu chú rể trăm năm hạnh phúcc</span>
                  </label>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-wedding-gold to-yellow-500 py-5 text-lg font-semibold text-white shadow-lg transition-all hover:from-wedding-gold/90 hover:to-yellow-500/90 hover:shadow-xl"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      "✨ Gửi xác nhận"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Hòm tiền mừng */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-wedding-gold/30 bg-gradient-to-br from-wedding-cream to-white p-6 shadow-lg h-full">
              <div className="mb-4 flex items-center justify-center gap-3">
                <Gift className="h-6 w-6 text-wedding-gold" />
                <h3 className="font-serif-display text-xl font-semibold text-wedding-gold">Hòm tiền mừng</h3>
                <Gift className="h-6 w-6 text-wedding-gold" />
              </div>
              <p className="mb-6 text-center text-sm text-muted-foreground italic">
                "Tình yêu không cần đong đếm, nhưng tấm lòng quý khách dành cho cặp đôi HoLa là điều chúng tôi trân quý mãi."
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* QR Nhà trai */}
                <div className="group rounded-xl bg-gradient-to-b from-blue-50 to-white p-4 text-center shadow-md transition-transform hover:scale-[1.02]">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
                    💙 Mừng Nhà Trai
                  </div>
                  <div className="mx-auto mb-3 h-36 w-36 overflow-hidden rounded-xl border-4 border-blue-200 bg-white p-1.5 shadow-inner">
                    <img
                      src="/photos/qr/hoangqr.jpg"
                      alt="QR chuyển khoản nhà trai"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-800">Nguyễn Văn Hoàng</p>
                  <p className="text-xs text-blue-600">Chú rể</p>
                </div>

                {/* QR Nhà gái */}
                <div className="group rounded-xl bg-gradient-to-b from-pink-50 to-white p-4 text-center shadow-md transition-transform hover:scale-[1.02]">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
                    💗 Mừng Nhà Gái
                  </div>
                  <div className="mx-auto mb-3 h-36 w-36 overflow-hidden rounded-xl border-4 border-pink-200 bg-white p-1.5 shadow-inner">
                    <img
                      src="/photos/qr/lamqr.jpg"
                      alt="QR chuyển khoản nhà gái"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-800">Lê Thị Thanh Lam</p>
                  <p className="text-xs text-pink-600">Cô dâu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
