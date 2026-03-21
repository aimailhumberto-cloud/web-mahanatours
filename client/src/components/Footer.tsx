/* Mahana Tours — Golden Hour Explorer Footer */
import { Link } from "wouter";
import { Sun, MapPin, Phone, Mail, Instagram } from "lucide-react";
import { LOCATION, PHONE, EMAIL, INSTAGRAM, WHATSAPP_URL } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-deep-blue text-white/80">
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                <Sun className="w-4 h-4 text-deep-blue" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Mahana Tours
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Aventuras en la Riviera del Pacífico panameño. Surf, islas, cascadas, pesca y más desde Playa Caracol.
            </p>
          </div>
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-wider mb-4">Tours</h4>
            <div className="flex flex-col gap-2">
              <Link href="/tours?cat=surf-kite" className="text-sm hover:text-gold transition-colors">Surf & Kite</Link>
              <Link href="/tours?cat=acuaticas" className="text-sm hover:text-gold transition-colors">Acuáticas</Link>
              <Link href="/tours?cat=premium" className="text-sm hover:text-gold transition-colors">Premium Adventures</Link>
              <Link href="/tours?cat=eco-adventures" className="text-sm hover:text-gold transition-colors">Eco Adventures</Link>
              <Link href="/botes" className="text-sm hover:text-gold transition-colors">Botes Premium</Link>
            </div>
          </div>
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-wider mb-4">Explora</h4>
            <div className="flex flex-col gap-2">
              <Link href="/nosotros" className="text-sm hover:text-gold transition-colors">Nosotros</Link>
              <a href="https://anspanama.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gold transition-colors">ANS Surf Academy</a>
              <a href="https://circuitochame.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gold transition-colors">Circuito Chame</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gold transition-colors">Reservar por WhatsApp</a>
            </div>
          </div>
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-wider mb-4">Contacto</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-sm">{LOCATION}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span className="text-sm">{PHONE}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span className="text-sm">{EMAIL}</span>
              </div>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Instagram className="w-4 h-4 text-gold shrink-0" />
                <span className="text-sm">@toursmahana</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Mahana Tours. Todos los derechos reservados.</p>
          <p className="text-xs text-white/40">Playa Caracol, Punta Chame, Panamá</p>
        </div>
      </div>
    </footer>
  );
}
