/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userStore } from '../store';

type ProtectedRouteProps = {
  element: React.ReactNode;
  adminRequired?: boolean;
};

export default function ProtectedRoute({
  element,
  adminRequired,
}: ProtectedRouteProps) {
  const accessToken = localStorage.getItem('token');
  const { authMe, userInfo } = userStore();
  useEffect(() => {
    authMe();
  }, []);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (adminRequired && !userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{element}</>;
}
