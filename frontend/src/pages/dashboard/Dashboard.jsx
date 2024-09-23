import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useTitle } from '../../hooks/useTitle';
import Funcionario from './Funcionario';
import Cliente from './Cliente';

export default function Dashboard() {
  const auth = useAuth();

  useTitle('Dashboard');

  if (!auth.isAuthenticated()) {
    return null;
  }

  if (!auth.user.cliente) {
    return (
      <Funcionario />
    );
  }

  return (
    <Cliente />
  );
}