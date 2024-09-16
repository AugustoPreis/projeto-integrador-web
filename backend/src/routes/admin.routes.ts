import { Router } from 'express';
import { funcaoRoutes } from '../controllers/funcao';
import { clienteRoutes } from '../controllers/cliente';

const routes = Router();

routes.use('/funcao', funcaoRoutes);
routes.use('/cliente', clienteRoutes);

export { routes as adminRoutes };