import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CheckCircle2, HeartHandshake, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { title: 'Manicure Clásica', price: '$45', duration: '45 min', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80' },
  { title: 'Gel', price: '$70', duration: '60 min', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80' },
  { title: 'Acrílicas', price: '$95', duration: '90 min', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80' }
];

const testimonials = [
  { name: 'Maya R.', quote: 'Un ambiente impecable y un acabado que siempre supera mis expectativas.' },
  { name: 'Julieta P.', quote: 'Reserva rápida, atención premium y resultados de revista.' }
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid items-center gap-8 rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_30px_80px_-30px_rgba(44,33,31,0.3)] lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 text-sm font-semibold text-rose"> <Sparkles size={16}/> Diseño premium para tus uñas</p>
          <h1 className="max-w-2xl font-display text-4xl leading-tight text-espresso sm:text-5xl lg:text-6xl">Manicura de lujo con una estética moderna y elegante.</h1>
          <p className="mt-6 max-w-xl text-lg text-espresso/70">Glow Nails Studio ofrece servicios de alta gama, cuidado detallado y una experiencia relajante pensada para destacar tu estilo.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/book" className="rounded-full bg-espresso px-6 py-3 text-white shadow-lg shadow-espresso/15">Reservar cita</Link>
            <Link to="/services" className="rounded-full border border-espresso/20 px-6 py-3 text-espresso">Ver servicios</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="overflow-hidden rounded-[2rem]">
          <img src="https://images.unsplash.com/photo-1622288432480-4f7b0d3b6d7d?auto=format&fit=crop&w=1200&q=80" alt="Studio de uñas premium" className="h-[480px] w-full object-cover" />
        </motion.div>
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/70 p-8 lg:grid-cols-3">
        {[
          ['Atención exclusiva', 'Cada cliente recibe cuidado personalizado y recomendaciones a medida.'],
          ['Materiales premium', 'Trabajamos con productos de alta calidad para resultados duraderos.'],
          ['Ambiente relajante', 'Un espacio pensado para que te sientas cómoda y cuidada.']
        ].map(([title, text]) => <div key={title} className="rounded-[1.5rem] bg-cream p-6"><h3 className="font-semibold text-espresso">{title}</h3><p className="mt-2 text-espresso/70">{text}</p></div>)}
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-rose">Servicios destacados</p>
            <h2 className="mt-2 text-3xl font-semibold text-espresso">Estilos que combinan elegancia y detalle.</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => <div key={service.title} className="overflow-hidden rounded-[1.8rem] border border-white/70 bg-white/80 shadow-sm">
            <img src={service.image} alt={service.title} className="h-56 w-full object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between"><h3 className="font-semibold text-espresso">{service.title}</h3><span className="text-rose">{service.price}</span></div>
              <p className="mt-2 text-sm text-espresso/70">Duración: {service.duration}</p>
            </div>
          </div>)}
        </div>
      </section>

      <section className="grid gap-6 rounded-[2rem] bg-espresso p-8 text-white lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-rose">Nuestro compromiso</p>
          <h2 className="mt-3 text-3xl font-semibold">Resultados impecables que realzan tu belleza.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {['Diseño personalizado', 'Cuidado de alta gama', 'Ambiente relajante', 'Reserva sencilla'].map((item) => <div key={item} className="rounded-[1.2rem] bg-white/10 p-4"><div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-rose" /> <span>{item}</span></div></div>)}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-rose">Testimonios</p>
          <h2 className="mt-2 text-3xl font-semibold text-espresso">Clientes que vuelven por la experiencia completa.</h2>
          <div className="mt-6 space-y-4">
            {testimonials.map((t) => <div key={t.name} className="rounded-[1.2rem] border border-espresso/10 bg-cream p-5"><p className="text-espresso/80">“{t.quote}”</p><p className="mt-3 font-semibold text-espresso">{t.name}</p></div>)}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-rose">Contacto</p>
          <h2 className="mt-2 text-3xl font-semibold text-espresso">Visítanos</h2>
          <div className="mt-6 space-y-4 text-espresso/70">
            <div className="flex items-center gap-3"><MapPin size={18} className="text-rose" /> <span>Av. Magnolia 120, Toronto, ON</span></div>
            <div className="flex items-center gap-3"><CalendarDays size={18} className="text-rose" /> <span>Lunes a Sábado · 10:00 - 20:00</span></div>
            <div className="flex items-center gap-3"><HeartHandshake size={18} className="text-rose" /> <span>Atención personalizada y profesional</span></div>
          </div>
          <Link to="/book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-white">Reserva ahora <ArrowRight size={16}/></Link>
        </div>
      </section>
    </div>
  );
}
