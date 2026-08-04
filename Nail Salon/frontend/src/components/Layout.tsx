import { Link, NavLink, useLocation } from 'react-router-dom';
import { CalendarDays, Home, Scissors, Sparkles, UserRound, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const nav = [
    { to: '/', label: 'Inicio', icon: Home },
    { to: '/services', label: 'Servicios', icon: Scissors },
    { to: '/book', label: 'Reservar', icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-cream text-espresso">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-full bg-espresso p-3 text-white"><Sparkles size={18} /></div>
            <div>
              <p className="font-semibold tracking-[0.3em] text-espresso">GLOW</p>
              <p className="text-xs text-rose">Nails Studio</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => {
              const Icon = item.icon;
              return <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center gap-2 text-sm font-medium ${isActive ? 'text-rose' : 'text-espresso/80'}`}>
                <Icon size={16} /> {item.label}
              </NavLink>;
            })}
            {user ? (
              <>
                {user.role === 'admin' && <NavLink to="/admin" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-rose' : 'text-espresso/80'}`}>Dashboard</NavLink>}
                <NavLink to="/profile" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-rose' : 'text-espresso/80'}`}>Perfil</NavLink>
                <button onClick={logout} className="rounded-full border border-rose/30 px-4 py-2 text-sm text-rose">Cerrar</button>
              </>
            ) : (
              <Link to="/login" className="rounded-full bg-espresso px-4 py-2 text-sm text-white">Ingresar</Link>
            )}
          </nav>
          <button className="rounded-full border border-espresso/20 p-2 md:hidden" onClick={() => setMobileOpen((prev) => !prev)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {mobileOpen && <div className="border-t border-espresso/10 bg-white/90 p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="text-sm font-medium">{item.label}</Link>)}
            {user ? <><Link to="/profile" onClick={() => setMobileOpen(false)}>Perfil</Link><button onClick={() => { logout(); setMobileOpen(false); }}>Cerrar sesión</button></> : <Link to="/login" onClick={() => setMobileOpen(false)}>Ingresar</Link>}
          </div>
        </div>}
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">{children}</main>
      <footer className="border-t border-espresso/10 bg-white/70 px-6 py-12 text-sm text-espresso/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold tracking-[0.3em] text-espresso">GLOW NAILS STUDIO</p>
            <p>Manicura premium, diseño impecable y atención exclusiva.</p>
          </div>
          <div>© {new Date().getFullYear()} Glow Nails Studio. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
