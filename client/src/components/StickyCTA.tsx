// Mahana Tours — Sticky CTA for mobile on detail pages
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface StickyCTAProps {
  label: string;
  price: number | string;
  whatsappLink: string;
}

export default function StickyCTA({ label, price, whatsappLink }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-deep-blue/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
      <div className="container flex items-center justify-between py-3 gap-4">
        <div className="flex flex-col">
          <span className="text-white/60 text-xs">{label}</span>
          <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
            ${typeof price === "number" ? price.toLocaleString() : price}
            <span className="text-white/50 text-xs ml-1">p/p</span>
          </span>
        </div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gold hover:bg-gold-light text-deep-blue px-5 py-2.5 rounded-full font-semibold text-sm transition-all"
        >
          Reservar <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
