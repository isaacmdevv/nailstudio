import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminServicesPage from './pages/AdminServicesPage';
import AdminClientsPage from './pages/AdminClientsPage';
import AdminAppointmentsPage from './pages/AdminAppointmentsPage';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children, admin = false }: { children: ReactNode; admin?: boolean }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (admin && user.role !== 'admin') return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/book" element={<ProtectedRoute><BookAppointmentPage /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><MyAppointmentsPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute admin><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute admin><AdminServicesPage /></ProtectedRoute>} />
        <Route path="/admin/clients" element={<ProtectedRoute admin><AdminClientsPage /></ProtectedRoute>} />
        <Route path="/admin/appointments" element={<ProtectedRoute admin><AdminAppointmentsPage /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
}
