import React from 'react';
import { Row } from 'antd';
import { useAuth } from '../../providers/AuthProvider';
import { useTitle } from '../../hooks/useTitle';
import Funcionario from './Funcionario';

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
    <Row>
    </Row>
  );
}