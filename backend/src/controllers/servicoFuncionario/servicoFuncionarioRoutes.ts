import { Router } from 'express';
import { servicoFuncionarioController } from '.';

const routes = Router();

routes.get('/historico', (req, res, next) => {
  servicoFuncionarioController.historico(req, res, next);
});

routes.post('/alterar-status', (req, res, next) => {
  servicoFuncionarioController.alterarStatus(req, res, next);
});

export { routes as servicoFuncionarioRoutes };