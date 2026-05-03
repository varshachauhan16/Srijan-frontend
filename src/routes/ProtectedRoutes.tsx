import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authoStore';
import type { AuthState } from '../store/authoStore';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((s: AuthState) => s.token);
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};