import { Navigate } from 'react-router-dom';
import { userStore } from '@/store';

type ProtectedRouteProps = {
  element: React.ReactNode;
  adminRequired?: boolean;
};

export default function ProtectedRoute({
  element,
  adminRequired,
}: ProtectedRouteProps) {
  const { userInfo } = userStore();

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  if (adminRequired && !userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{element}</>;
}
