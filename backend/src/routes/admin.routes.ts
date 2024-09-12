import { Router } from 'express';
import { funcaoRoutes } from '../controllers/funcao';

const routes = Router();

routes.use('/funcao', funcaoRoutes);

export { routes as adminRoutes };