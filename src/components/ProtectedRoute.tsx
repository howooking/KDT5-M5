/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userStore } from '@/store';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type ProtectedRouteProps = {
  element: React.ReactNode;
  adminRequired?: boolean;
};

export default function ProtectedRoute({
  element,
  adminRequired,
}: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const { authMe } = userStore();
  const [loggedInUser, setLoggedInUser] = useState<User | void>();

  useEffect(() => {
    async function getLoggedInUser() {
      const user = await authMe();
      setLoggedInUser(user);
      setLoading(false);
    }
    getLoggedInUser();
  }, []);

  if (loading) {
    return <LoadingSpinner color="accent" />;
  }

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }
  if (adminRequired && !loggedInUser?.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{element}</>;
}
