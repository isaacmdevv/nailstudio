import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register: registerForm, handleSubmit, formState: { errors } } = useForm();
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await register({ ...data, role: 'client' });
      navigate('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || 'No se pudo crear la cuenta');
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-rose">Registro</p>
        <h1 className="mt-2 text-3xl font-semibold text-espresso">Crea tu cuenta</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
        <input {...registerForm('full_name', { required: 'Nombre requerido' })} className="rounded-full border border-espresso/20 bg-cream px-4 py-3" placeholder="Nombre completo" />
        <input {...registerForm('email', { required: 'Email requerido' })} className="rounded-full border border-espresso/20 bg-cream px-4 py-3" placeholder="Email" />
        <input type="password" {...registerForm('password', { required: 'Contraseña requerida', minLength: 6 })} className="rounded-full border border-espresso/20 bg-cream px-4 py-3" placeholder="Contraseña" />
        <input {...registerForm('phone', { required: 'Teléfono requerido' })} className="rounded-full border border-espresso/20 bg-cream px-4 py-3" placeholder="Teléfono" />
        <textarea {...registerForm('address')} className="md:col-span-2 rounded-[1.5rem] border border-espresso/20 bg-cream px-4 py-3" placeholder="Dirección" />
        <button className="md:col-span-2 rounded-full bg-espresso px-6 py-3 text-white">Crear cuenta</button>
      </form>
      <p className="text-sm text-espresso/70">¿Ya tienes cuenta? <Link to="/login" className="text-rose">Inicia sesión</Link></p>
    </div>
  );
}
