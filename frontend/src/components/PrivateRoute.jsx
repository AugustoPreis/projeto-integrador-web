import React, { lazy, Suspense, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const Menu = lazy(() => import('./Menu'));

export default function PrivateRoute() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate('/entrar');
    }
  }, [auth.user]);

  return (
    <React.Fragment>
      <Suspense fallback={<div>Carregando...</div>}>
        <Menu />
        <Outlet />
      </Suspense>
    </React.Fragment>
  );
}