import { Router } from 'express';
import isAdmin from '../middlewares/admin';
import { servicoController, servicoRoutes } from '../controllers/servico';
import { servicoFuncionarioRoutes } from '../controllers/servicoFuncionario';
import { adminRoutes } from './admin.routes';
import { funcaoController } from '../controllers/funcao';
import { produtoController } from '../controllers/produto';
import { funcionarioController } from '../controllers/funcionario';
import { clienteController } from '../controllers/cliente';
import { tipoServicoController } from '../controllers/tipoServico';

const routes = Router();

routes.get('/funcao/listagem', (req, res, next) => {
  funcaoController.listagem(req, res, next);
});

routes.get('/cliente/listagem', (req, res, next) => {
  clienteController.listagem(req, res, next);
});

routes.get('/funcionario/listagem', (req, res, next) => {
  funcionarioController.listagem(req, res, next);
});

routes.get('/produto/listagem', (req, res, next) => {
  produtoController.listagem(req, res, next);
});

routes.get('/tipo-servico/listagem', (req, res, next) => {
  tipoServicoController.listagem(req, res, next);
});

routes.get('/servico/listagem-funcionario', (req, res, next) => {
  servicoController.listagemFuncionario(req, res, next);
});

routes.use('/servico', servicoRoutes);
routes.use('/servico-funcionario', servicoFuncionarioRoutes);

routes.use('/admin', isAdmin, adminRoutes);

export { routes as apiRoutes };