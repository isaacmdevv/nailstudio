import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  const load = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/appointments', { headers: { Authorization: `Bearer ${token}` } });
    setAppointments(data);
  };

  useEffect(() => { void load(); }, []);

  const updateStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('token');
    await axios.patch(`/appointments/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
    await load();
  };

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8">
      <h2 className="text-xl font-semibold text-espresso">Citas</h2>
      <div className="mt-6 space-y-3">
        {appointments.map((appointment) => <div key={appointment.id} className="flex flex-col justify-between gap-4 rounded-[1.2rem] border border-espresso/10 bg-cream p-4 md:flex-row md:items-center">
          <div>
            <p className="font-semibold text-espresso">{appointment.service_name}</p>
            <p className="text-sm text-espresso/70">{appointment.client_name} · {appointment.appointment_date} {appointment.appointment_time}</p>
          </div>
          <div className="flex items-center gap-2">
            <select defaultValue={appointment.status} onChange={(e) => updateStatus(appointment.id, e.target.value)} className="rounded-full border border-espresso/20 bg-white px-3 py-2 text-sm">
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
              <option value="completada">Completada</option>
            </select>
          </div>
        </div>)}
      </div>
    </div>
  );
}
