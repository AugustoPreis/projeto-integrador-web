import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//login não deve ser importado com lazy
import Login from '../pages/login/Login';

const PrivateRoute = lazy(() => import('../components/PrivateRoute'));

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Funcao = lazy(() => import('../pages/funcao/Funcao'));
const Cliente = lazy(() => import('../pages/cliente/Cliente'));
const Funcionario = lazy(() => import('../pages/funcionario/Funcionario'));
const TipoServico = lazy(() => import('../pages/tipoServico/TipoServico'));
const Produto = lazy(() => import('../pages/produto/Produto'));
const Servico = lazy(() => import('../pages/servico/Servico'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index
          element={<Login />} />
        <Route path='/entrar'
          element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route index
            element={<Dashboard />} />
          <Route path='/dashboard'
            element={<Dashboard />} />
          <Route path='/funcoes'
            element={<Funcao />} />
          <Route path='/clientes'
            element={<Cliente />} />
          <Route path='/funcionarios'
            element={<Funcionario />} />
          <Route path='/tipos-servico'
            element={<TipoServico />} />
          <Route path='/produtos'
            element={<Produto />} />
          <Route path='/servicos'
            element={<Servico />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}