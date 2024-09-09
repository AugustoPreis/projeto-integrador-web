import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const BACKEND_PORT = 3000;
const FRONTEND_PORT = 4000;
const PROXY_OPTIONS = {
  target: `http://localhost:${BACKEND_PORT}`,
  changeOrigin: true,
  secure: false,
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: FRONTEND_PORT,
    proxy: {
      '/login': PROXY_OPTIONS, //login no sistema
      '/api': PROXY_OPTIONS, //exige autenticação
      '/arquivo': PROXY_OPTIONS, //buscar arquivos
    },
  },
});