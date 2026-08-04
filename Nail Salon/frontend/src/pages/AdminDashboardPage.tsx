import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => setStats(data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-rose">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-espresso">Panel profesional de Glow Nails Studio</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        {[
          ['Total clientes', stats.total_clients],
          ['Total citas', stats.total_appointments],
          ['Ingresos', `$${stats.revenue || 0}`],
          ['Servicios vendidos', stats.services_sold]
        ].map(([label, value]) => <div key={label} className="rounded-[1.5rem] border border-white/70 bg-white/80 p-6"><p className="text-sm text-espresso/70">{label}</p><p className="mt-3 text-2xl font-semibold text-espresso">{value}</p></div>)}
      </div>
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8">Próximas citas y calendario se integrarán en esta vista comercial.</div>
    </div>
  );
}
