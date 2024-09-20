import { Router } from 'express';
import { funcaoRoutes } from '../controllers/funcao';
import { clienteRoutes } from '../controllers/cliente';
import { funcionarioRoutes } from '../controllers/funcionario';
import { tipoServicoRoutes } from '../controllers/tipoServico';
import { produtoRoutes } from '../controllers/produto';

const routes = Router();

routes.use('/funcao', funcaoRoutes);
routes.use('/cliente', clienteRoutes);
routes.use('/funcionario', funcionarioRoutes);
routes.use('/tipo-servico', tipoServicoRoutes);
routes.use('/produto', produtoRoutes);

export { routes as adminRoutes };