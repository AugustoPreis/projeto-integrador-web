import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export default function PrivateRoute() {
  const auth = useAuth();

  if (!auth.isAuthenticated()) {
    return (
      <Navigate to='/entrar' />
    );
  }

  return (
    <Outlet />
  );
}