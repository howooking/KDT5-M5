import { Navigate } from 'react-router-dom';
import { userStore } from '@/store';

type LogoutNeededRouteProps = {
  element: React.ReactNode;
};

export default function LogoutNeededRoute({ element }: LogoutNeededRouteProps) {
  const { userInfo } = userStore();

  if (userInfo) {
    return <Navigate to="/" replace />;
  }
  return <>{element}</>;
}
