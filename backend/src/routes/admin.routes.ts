import { Router } from 'express';
import { funcaoRoutes } from '../controllers/funcao';
import { clienteRoutes } from '../controllers/cliente';
import { funcionarioRoutes } from '../controllers/funcionario';

const routes = Router();

routes.use('/funcao', funcaoRoutes);
routes.use('/cliente', clienteRoutes);
routes.use('/funcionario', funcionarioRoutes);

export { routes as adminRoutes };