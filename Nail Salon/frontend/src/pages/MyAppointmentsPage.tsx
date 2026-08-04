import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Appointment { id: number; appointment_date: string; appointment_time: string; status: string; service_name: string; }

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const load = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/appointments/me', { headers: { Authorization: `Bearer ${token}` } });
    setAppointments(data);
  };

  useEffect(() => { void load(); }, []);

  const cancel = async (id: number) => {
    if (!window.confirm('¿Deseas cancelar esta cita?')) return;
    const token = localStorage.getItem('token');
    await axios.patch(`/appointments/${id}/cancel`, {}, { headers: { Authorization: `Bearer ${token}` } });
    toast.success('Cita cancelada');
    await load();
  };

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.3em] text-rose">Mis citas</p>
      <h1 className="mt-2 text-3xl font-semibold text-espresso">Gestiona tus reservas</h1>
      <div className="mt-8 space-y-4">
        {appointments.length === 0 ? <div className="rounded-[1.5rem] bg-cream p-6 text-espresso/70">Aún no tienes citas.</div> : appointments.map((appointment) => <div key={appointment.id} className="flex flex-col justify-between gap-4 rounded-[1.5rem] border border-espresso/10 bg-cream p-5 md:flex-row md:items-center">
          <div>
            <h3 className="font-semibold text-espresso">{appointment.service_name}</h3>
            <p className="text-sm text-espresso/70">{appointment.appointment_date} · {appointment.appointment_time}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white px-3 py-2 text-sm text-espresso">{appointment.status}</span>
            {appointment.status !== 'cancelada' && <button onClick={() => cancel(appointment.id)} className="rounded-full bg-rose px-4 py-2 text-sm text-white">Cancelar</button>}
          </div>
        </div>)}
      </div>
    </div>
  );
}
