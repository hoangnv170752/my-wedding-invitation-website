import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionDivider from "./SectionDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const RSVPSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "RSVP Received! 🎉",
      description: "Thank you for your response. We can't wait to celebrate with you!",
    });
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
            Join Our Celebration
          </p>
          <h2 className="mt-2 font-serif-display text-3xl font-bold md:text-4xl">RSVP</h2>
          <SectionDivider />
        </div>

        <div className="mx-auto mt-8 max-w-lg">
          {submitted ? (
            <div className="rounded-xl border border-wedding-gold-light bg-background p-10 text-center shadow-sm">
              <span className="text-5xl">💌</span>
              <h3 className="mt-4 font-serif-display text-2xl font-semibold">Thank You!</h3>
              <p className="mt-2 text-muted-foreground">We've received your RSVP. See you at the celebration!</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-xl border border-wedding-gold-light bg-background p-8 shadow-sm"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input placeholder="Your Name" required className="border-wedding-gold-light focus-visible:ring-wedding-gold" />
                <Input type="email" placeholder="Email Address" required className="border-wedding-gold-light focus-visible:ring-wedding-gold" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input type="number" min={1} max={5} placeholder="Number of Guests" required className="border-wedding-gold-light focus-visible:ring-wedding-gold" />
                <select
                  required
                  className="flex h-10 w-full rounded-md border border-wedding-gold-light bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wedding-gold focus-visible:ring-offset-2"
                  defaultValue=""
                >
                  <option value="" disabled>Meal Preference</option>
                  <option value="chicken">Chicken</option>
                  <option value="fish">Fish</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
              <Textarea placeholder="Your Message (Optional)" rows={4} className="border-wedding-gold-light focus-visible:ring-wedding-gold" />
              <Button
                type="submit"
                className="w-full bg-wedding-gold text-white hover:bg-wedding-gold/90 font-serif-elegant tracking-widest uppercase"
              >
                Send RSVP
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
