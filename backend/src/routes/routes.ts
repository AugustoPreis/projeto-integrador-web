import { Router } from 'express';
import auth from '../middlewares/auth';
import { loginController } from '../controllers/login';
import { apiRoutes } from './api.routes';

const routes = Router();

routes.post('/login', (req, res, next) => {
  loginController.login(req, res, next);
});

routes.get('/api', auth, apiRoutes);

routes.use('/*', (req, res) => {
  res.status(404).json({ message: `Rota não encontrada: ${req.baseUrl}` });
})

export { routes };