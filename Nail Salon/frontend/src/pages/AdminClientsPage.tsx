import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/users', { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => setClients(data));
  }, []);

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8">
      <h2 className="text-xl font-semibold text-espresso">Clientes</h2>
      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-espresso/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-cream text-espresso/80">
            <tr><th className="px-4 py-3">Nombre</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Teléfono</th></tr>
          </thead>
          <tbody>
            {clients.map((client) => <tr key={client.id} className="border-t border-espresso/10"><td className="px-4 py-3">{client.full_name}</td><td className="px-4 py-3">{client.email}</td><td className="px-4 py-3">{client.phone}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
