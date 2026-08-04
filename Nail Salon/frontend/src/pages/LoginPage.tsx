import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { register: registerForm, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || 'No se pudo iniciar sesión');
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-sm">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-rose">Acceso</p>
        <h1 className="mt-2 text-3xl font-semibold text-espresso">Inicia sesión</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...registerForm('email', { required: 'Email requerido' })} className="w-full rounded-full border border-espresso/20 bg-cream px-4 py-3" placeholder="Email" />
        {errors.email && <p className="text-sm text-rose">{String(errors.email.message)}</p>}
        <input type="password" {...registerForm('password', { required: 'Contraseña requerida' })} className="w-full rounded-full border border-espresso/20 bg-cream px-4 py-3" placeholder="Contraseña" />
        <button className="w-full rounded-full bg-espresso px-6 py-3 text-white">Entrar</button>
      </form>
      <p className="text-sm text-espresso/70">¿No tienes cuenta? <Link to="/register" className="text-rose">Crear cuenta</Link></p>
    </div>
  );
}
