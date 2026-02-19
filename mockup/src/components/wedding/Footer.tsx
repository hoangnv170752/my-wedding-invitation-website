import { Heart, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="bg-wedding-dark py-12 text-center text-white/80">
    <div className="container mx-auto px-4">
      <h3 className="font-serif-display text-2xl font-semibold text-white md:text-3xl">
        Hoàng & Lam
      </h3>
      <p className="mt-2 font-serif-elegant text-sm tracking-widest">29/03/2026</p>
      <div className="mx-auto mt-4 h-px w-16 bg-wedding-gold-light" />
      <div className="mt-6 flex justify-center gap-5">
        <a href="#" className="transition-colors hover:text-wedding-gold"><Facebook size={20} /></a>
        <a href="#" className="transition-colors hover:text-wedding-gold"><Instagram size={20} /></a>
        <a href="#" className="transition-colors hover:text-wedding-gold"><Twitter size={20} /></a>
      </div>
      <p className="mt-8 flex items-center justify-center gap-1 text-xs text-white/50">
        Made with <Heart size={12} className="text-wedding-rose" /> by Hoàng & Lam
      </p>
    </div>
  </footer>
);

export default Footer;
