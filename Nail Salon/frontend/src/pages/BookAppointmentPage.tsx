import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Service { id: number; name: string; duration_minutes: number; price: number; }
interface Slot { date: string; time: string; }

export default function BookAppointmentPage() {
  const { register, handleSubmit, watch } = useForm();
  const [services, setServices] = useState<Service[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/services').then(({ data }) => setServices(data));
  }, []);

  const selectedService = watch('service_id');

  useEffect(() => {
    if (selectedDate) {
      const token = localStorage.getItem('token');
      axios.get(`/appointments/available-slots?date=${selectedDate}`, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => setSlots(data));
    }
  }, [selectedDate]);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('token');
    await axios.post('/appointments', data, { headers: { Authorization: `Bearer ${token}` } });
    toast.success('Cita reservada correctamente');
    navigate('/appointments');
  };

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.3em] text-rose">Reservar cita</p>
      <h1 className="mt-2 text-3xl font-semibold text-espresso">Elige tu servicio, fecha y hora</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4">
        <select {...register('service_id', { required: true })} className="rounded-full border border-espresso/20 bg-cream px-4 py-3">
          <option value="">Selecciona un servicio</option>
          {services.map((service) => <option key={service.id} value={service.id}>{service.name} — ${service.price}</option>)}
        </select>
        <input type="date" onChange={(e) => setSelectedDate(e.target.value)} className="rounded-full border border-espresso/20 bg-cream px-4 py-3" />
        <select {...register('appointment_time', { required: true })} className="rounded-full border border-espresso/20 bg-cream px-4 py-3">
          <option value="">Selecciona un horario</option>
          {slots.map((slot) => <option key={slot.time} value={slot.time}>{slot.time}</option>)}
        </select>
        <textarea {...register('notes')} className="rounded-[1.5rem] border border-espresso/20 bg-cream px-4 py-3" placeholder="Notas adicionales" />
        <button className="rounded-full bg-espresso px-6 py-3 text-white">Confirmar reserva</button>
      </form>
    </div>
  );
}
