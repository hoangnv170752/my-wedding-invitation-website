import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Trang chủ", href: "#home" },
  { label: "Cô dâu & Chú rể", href: "#couple" },
  { label: "Câu chuyện", href: "#story" },
  { label: "Sự kiện", href: "#events" },
  { label: "Thư viện ảnh", href: "#gallery" },
  // { label: "Phù rể & Phù dâu", href: "#party" },
  { label: "Xác nhận tham dự", href: "#rsvp" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:py-5">
        <a
          href="#home"
          className="font-vietnam text-xl font-bold tracking-wide text-wedding-gold md:text-2xl"
        >
          H & L
        </a>

        {/* Desktop */}
        <ul className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-serif-elegant text-sm tracking-widest uppercase text-foreground/70 transition-colors hover:text-wedding-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full bg-background/95 backdrop-blur-md shadow-lg md:hidden">
          <ul className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif-elegant text-sm tracking-widest uppercase text-foreground/70 transition-colors hover:text-wedding-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
