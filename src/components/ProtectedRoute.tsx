/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authenticate } from '../api/authApi';

type ProtectedRouteProps = {
  element: React.ReactNode;
  adminRequired?: boolean;
};

export default function ProtectedRoute({
  element,
  adminRequired,
}: ProtectedRouteProps) {
  const accessToken = localStorage.getItem('token');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticate(accessToken).then((data) => {
      if (!data) {
        setUserEmail('');
        setLoading(false);
        return;
      }
      setUserEmail(data.email);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  if (adminRequired && userEmail !== 'admin@naver.com') {
    return <Navigate to="/" replace />;
  }
  return <>{element}</>;
}
