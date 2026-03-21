/* Mahana Tours — Nosotros (About) Page */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Sun, Users, Shield, Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { IMAGES, WHATSAPP_URL } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const FAQS = [
  { q: "¿Dónde están ubicados?", a: "Operamos desde Playa Caracol, Punta Chame, a solo 90 minutos de Ciudad de Panamá por la carretera Interamericana." },
  { q: "¿Necesito experiencia previa para los tours?", a: "La mayoría de nuestros tours son aptos para principiantes. Cada tour indica su nivel de dificultad. Nuestros guías se adaptan a tu nivel." },
  { q: "¿Cómo reservo?", a: "Por WhatsApp al +507 6988-4566. Respondemos en menos de 1 hora. También puedes reservar a través de nuestro e-commerce en Club Mahana." },
  { q: "¿Qué pasa si llueve?", a: "Dependiendo del tour, se reprograma sin costo o se ofrece una alternativa. La seguridad es nuestra prioridad." },
  { q: "¿Ofrecen tours privados?", a: "Sí. Todos nuestros tours pueden ser privados. También armamos experiencias a la medida para grupos, empresas y eventos especiales." },
  { q: "¿Tienen alojamiento?", a: "No operamos hotel directamente, pero trabajamos con el Radisson Riviera en Playa Caracol y apartamentos locales. Podemos armar paquetes con estadía incluida." },
  { q: "¿Aceptan tarjetas de crédito?", a: "Sí, aceptamos tarjetas de crédito, transferencias bancarias, Yappy y efectivo." },
  { q: "¿Hay descuentos para grupos?", a: "Sí, ofrecemos tarifas especiales para grupos de 6+ personas. Contáctanos para una cotización personalizada." },
];

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-sand">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.beachAerial} alt="Playa Caracol" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/80 to-deep-blue/60" />
        </div>
        <div className="container relative z-10 text-center">
          <span className="text-gold text-sm font-semibold uppercase tracking-[0.2em]">Nuestra Historia</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Nosotros
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Somos Mahana Tours, tu puerta a la aventura en la Riviera del Pacífico panameño.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <h2 className="text-3xl font-bold text-deep-blue mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Mahana significa <span className="text-gold-dark">"amanecer"</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                En polinesio, Mahana significa "amanecer" — ese momento mágico donde el primer rayo de sol toca el Pacífico y todo es posible. Esa es la sensación que queremos que vivas en cada tour.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nacimos en Playa Caracol con una misión simple: compartir los tesoros escondidos de la Riviera del Pacífico panameño con el mundo. Desde clases de surf hasta expediciones de pesca en yate, cada experiencia está diseñada para que te lleves algo más que fotos.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Somos parte del ecosistema Playa Caracol 360, que incluye la Academia Nacional de Surf (ANS), el Circuito Turístico Chame, y el Radisson Riviera como base de operaciones. Juntos, ofrecemos la experiencia más completa de la costa pacífica de Panamá.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <div className="grid grid-cols-2 gap-3">
                <img src={IMAGES.caracolBeach} alt="Playa Caracol" className="rounded-xl h-48 w-full object-cover" />
                <img src={IMAGES.surfGroup} alt="Team" className="rounded-xl h-48 w-full object-cover" />
                <img src={IMAGES.islaOtoque} alt="Isla Otoque" className="rounded-xl h-48 w-full object-cover" />
                <img src={IMAGES.cerroChame} alt="Cerro Chame" className="rounded-xl h-48 w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-sand">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-gold-dark text-sm font-semibold uppercase tracking-[0.2em]">Nuestros Valores</span>
            <h2 className="text-3xl font-bold text-deep-blue mt-3" style={{ fontFamily: "var(--font-display)" }}>Lo que nos define</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "Seguridad Primero", desc: "Instructores certificados, equipo de primera y protocolos estrictos. Tu seguridad nunca es negociable." },
              { icon: <Star className="w-6 h-6" />, title: "Experiencia Local", desc: "Conocemos cada ola, cada cascada, cada rincón. Somos de aquí y eso se nota en cada tour." },
              { icon: <Users className="w-6 h-6" />, title: "Grupos Pequeños", desc: "Máximo 8-15 personas por tour. Atención personalizada, no turismo masivo." },
              { icon: <Sun className="w-6 h-6" />, title: "Sostenibilidad", desc: "Respetamos el océano, la selva y las comunidades locales. Turismo responsable siempre." },
            ].map((val, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-white rounded-xl p-6 border border-sand-dark text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 text-gold-dark">{val.icon}</div>
                <h3 className="font-bold text-deep-blue mb-2" style={{ fontFamily: "var(--font-display)" }}>{val.title}</h3>
                <p className="text-sm text-muted-foreground">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-20 bg-deep-blue">
        <div className="container text-center">
          <span className="text-gold text-sm font-semibold uppercase tracking-[0.2em]">Ecosistema 360</span>
          <h2 className="text-3xl font-bold text-white mt-3 mb-12" style={{ fontFamily: "var(--font-display)" }}>Parte de algo más grande</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "ANS Surf", desc: "Academia Nacional de Surf. Clases, masterclasses, camps y retreats para todos los niveles.", img: IMAGES.surfAction },
              { name: "Circuito Chame", desc: "8 circuitos turísticos con estadía incluida. La experiencia completa de la Riviera del Pacífico.", img: IMAGES.cascadaFilipinas },
              { name: "Radisson Riviera", desc: "Hotel frente al mar con piscina, restaurante Vento Beach Club, spa y salones de eventos.", img: IMAGES.radissonAerial },
            ].map((eco, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="group">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img src={eco.img} alt={eco.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{eco.name}</h3>
                <p className="text-white/60 text-sm">{eco.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" id="faq">
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <span className="text-gold-dark text-sm font-semibold uppercase tracking-[0.2em]">FAQ</span>
            <h2 className="text-3xl font-bold text-deep-blue mt-3" style={{ fontFamily: "var(--font-display)" }}>Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.details key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="group bg-sand rounded-xl border border-sand-dark overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-deep-blue">
                  {faq.q}
                  <span className="text-gold-dark text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.caracolAerial2} alt="Playa Caracol" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-deep-blue/75" />
        </div>
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>¿Listo para tu aventura?</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">Escríbenos y armamos la experiencia perfecta para ti.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-deep-blue font-semibold rounded-full hover:bg-gold-light transition-colors">
              Hablar por WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/tours" className="px-8 py-3 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
              Explorar Tours
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
