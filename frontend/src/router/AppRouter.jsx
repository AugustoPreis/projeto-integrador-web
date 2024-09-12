import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const PrivateRoute = lazy(() => import('../components/PrivateRoute'));

const Login = lazy(() => import('../pages/login/Login'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Funcao = lazy(() => import('../pages/funcao/Funcao'));

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}