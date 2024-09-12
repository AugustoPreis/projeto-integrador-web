import { Router } from 'express';
import { loginController } from '../controllers/login';

const routes = Router();

routes.post('/login', (req, res, next) => {
  loginController.login(req, res, next);
});

export { routes };