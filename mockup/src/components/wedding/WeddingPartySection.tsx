import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionDivider from "./SectionDivider";

const partyMembers = [
  { name: "Emily Davis", role: "Maid of Honor", emoji: "👩" },
  { name: "Olivia Martinez", role: "Bridesmaid", emoji: "👩" },
  { name: "Ava Johnson", role: "Bridesmaid", emoji: "👩" },
  { name: "Michael Thompson", role: "Best Man", emoji: "👨" },
  { name: "Daniel Wilson", role: "Groomsman", emoji: "👨" },
  { name: "Ethan Brown", role: "Groomsman", emoji: "👨" },
];

const WeddingPartySection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="party" className="py-20 md:py-28">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center">
          <p className="font-serif-elegant text-lg tracking-[0.2em] uppercase text-muted-foreground">
            Our Closest People
          </p>
          <h2 className="mt-2 font-serif-display text-3xl font-bold md:text-4xl">Wedding Party</h2>
          <SectionDivider />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8 max-w-4xl mx-auto">
          {partyMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-wedding-blush text-4xl shadow-sm md:h-28 md:w-28">
                {member.emoji}
              </div>
              <h3 className="mt-4 font-serif-display text-lg font-semibold">{member.name}</h3>
              <p className="mt-1 font-serif-elegant text-sm italic text-wedding-gold">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingPartySection;
