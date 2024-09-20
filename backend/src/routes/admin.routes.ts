import { Router } from 'express';
import { funcaoRoutes } from '../controllers/funcao';
import { clienteRoutes } from '../controllers/cliente';
import { funcionarioRoutes } from '../controllers/funcionario';
import { tipoServicoRoutes } from '../controllers/tipoServico';
import { produtoRoutes } from '../controllers/produto';
import { servicoRoutes } from '../controllers/servico';
import { servicoFuncionarioRoutes } from '../controllers/servicoFuncionario/servicoFuncionarioRoutes';

const routes = Router();

routes.use('/funcao', funcaoRoutes);
routes.use('/cliente', clienteRoutes);
routes.use('/funcionario', funcionarioRoutes);
routes.use('/tipo-servico', tipoServicoRoutes);
routes.use('/produto', produtoRoutes);
routes.use('/servico', servicoRoutes);
routes.use('/servico-funcionario', servicoFuncionarioRoutes);

export { routes as adminRoutes };