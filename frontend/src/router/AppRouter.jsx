import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('../login/Login'));

export default function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index
          element={<Login />} />
        <Route path='/login'
          element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}