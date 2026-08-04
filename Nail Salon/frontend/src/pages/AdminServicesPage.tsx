import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const { register, handleSubmit, reset } = useForm();

  const load = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/services', { headers: { Authorization: `Bearer ${token}` } });
    setServices(data);
  };

  useEffect(() => { void load(); }, []);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('token');
    await axios.post('/services', data, { headers: { Authorization: `Bearer ${token}` } });
    toast.success('Servicio creado');
    reset();
    await load();
  };

  const remove = async (id: number) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/services/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    toast.success('Servicio eliminado');
    await load();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-[2rem] border border-white/70 bg-white/80 p-8">
        <h2 className="text-xl font-semibold text-espresso">Crear servicio</h2>
        <div className="mt-4 space-y-3">
          <input {...register('name')} placeholder="Nombre" className="w-full rounded-full border border-espresso/20 bg-cream px-4 py-3" />
          <textarea {...register('description')} placeholder="Descripción" className="w-full rounded-[1.5rem] border border-espresso/20 bg-cream px-4 py-3" />
          <input {...register('price')} type="number" placeholder="Precio" className="w-full rounded-full border border-espresso/20 bg-cream px-4 py-3" />
          <input {...register('duration_minutes')} type="number" placeholder="Duración min" className="w-full rounded-full border border-espresso/20 bg-cream px-4 py-3" />
          <input {...register('image_url')} placeholder="URL de imagen" className="w-full rounded-full border border-espresso/20 bg-cream px-4 py-3" />
          <button className="w-full rounded-full bg-espresso px-6 py-3 text-white">Guardar</button>
        </div>
      </form>
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8">
        <h2 className="text-xl font-semibold text-espresso">Servicios</h2>
        <div className="mt-4 space-y-3">
          {services.map((service) => <div key={service.id} className="flex items-center justify-between rounded-[1.2rem] border border-espresso/10 bg-cream p-4"><div><p className="font-semibold text-espresso">{service.name}</p><p className="text-sm text-espresso/70">${service.price}</p></div><button onClick={() => remove(service.id)} className="rounded-full bg-rose px-4 py-2 text-sm text-white">Eliminar</button></div>)}
        </div>
      </div>
    </div>
  );
}
