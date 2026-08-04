import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

interface Service { id: number; name: string; description: string; price: number; duration_minutes: number; image_url?: string; }

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/services').then(({ data }) => setServices(data)).catch(() => setServices([]));
  }, []);

  const filtered = useMemo(() => services.filter((service) => service.name.toLowerCase().includes(search.toLowerCase())), [services, search]);

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-rose">Servicios</p>
        <h1 className="mt-2 text-3xl font-semibold text-espresso">Explora una selección de tratamientos premium.</h1>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar servicio" className="mt-6 w-full rounded-full border border-espresso/20 bg-cream px-4 py-3 outline-none md:max-w-md" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((service) => <div key={service.id} className="overflow-hidden rounded-[1.8rem] border border-white/70 bg-white/80 shadow-sm">
          <img src={service.image_url || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80'} alt={service.name} className="h-56 w-full object-cover" />
          <div className="p-6">
            <div className="flex items-center justify-between"><h3 className="font-semibold text-espresso">{service.name}</h3><span className="text-rose">${service.price}</span></div>
            <p className="mt-3 text-sm text-espresso/70">{service.description}</p>
            <p className="mt-3 text-sm font-medium text-espresso/80">Duración: {service.duration_minutes} min</p>
          </div>
        </div>)}
      </div>
    </div>
  );
}
