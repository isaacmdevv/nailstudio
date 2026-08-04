import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, refresh } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
      setProfile(data);
      setValue('full_name', data.full_name);
      setValue('phone', data.phone);
      setValue('address', data.address);
    });
  }, [setValue]);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('token');
    await axios.put('/auth/me', data, { headers: { Authorization: `Bearer ${token}` } });
    toast.success('Perfil actualizado');
    await refresh();
  };

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const form = e.target as HTMLFormElement;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    await axios.post('/auth/change-password', { password }, { headers: { Authorization: `Bearer ${token}` } });
    toast.success('Contraseña cambiada');
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-rose">Perfil</p>
        <h1 className="mt-2 text-3xl font-semibold text-espresso">Hola, {profile?.full_name || user?.full_name}</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-[2rem] border border-white/70 bg-white/80 p-8">
          <h2 className="text-xl font-semibold text-espresso">Editar información</h2>
          <div className="mt-4 grid gap-4">
            <input {...register('full_name')} className="rounded-full border border-espresso/20 bg-cream px-4 py-3" placeholder="Nombre" />
            <input {...register('phone')} className="rounded-full border border-espresso/20 bg-cream px-4 py-3" placeholder="Teléfono" />
            <textarea {...register('address')} className="rounded-[1.5rem] border border-espresso/20 bg-cream px-4 py-3" placeholder="Dirección" />
            <button className="rounded-full bg-espresso px-6 py-3 text-white">Guardar cambios</button>
          </div>
        </form>
        <form onSubmit={changePassword} className="rounded-[2rem] border border-white/70 bg-white/80 p-8">
          <h2 className="text-xl font-semibold text-espresso">Cambiar contraseña</h2>
          <input name="password" type="password" className="mt-4 w-full rounded-full border border-espresso/20 bg-cream px-4 py-3" placeholder="Nueva contraseña" />
          <button className="mt-4 w-full rounded-full bg-rose px-6 py-3 text-white">Actualizar contraseña</button>
        </form>
      </div>
    </div>
  );
}
