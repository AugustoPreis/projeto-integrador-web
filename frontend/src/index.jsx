import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import AppRouter from './router/AppRouter';
import AuthProvider from './providers/AuthProvider';
import Screen from './components/Screen';

const root = createRoot(document.getElementById('root'));

root.render(
  <ConfigProvider locale={ptBR}
    theme={{
      token: {
        colorPrimary: '#ff5c04',
      },
    }}>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </ConfigProvider>,
);