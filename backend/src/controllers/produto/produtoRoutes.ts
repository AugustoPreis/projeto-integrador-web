import { Router } from 'express';
import { produtoController } from '.';

const routes = Router();

routes.get('/listagem', (req, res, next) => {
  produtoController.listagem(req, res, next);
});

routes.get('/detalhes', (req, res, next) => {
  produtoController.detalhes(req, res, next);
});

routes.post('/salvar', (req, res, next) => {
  produtoController.salvar(req, res, next);
});

routes.put('/salvar', (req, res, next) => {
  produtoController.atualizar(req, res, next);
});

routes.put('/inativar', (req, res, next) => {
  produtoController.inativar(req, res, next);
});

export { routes as produtoRoutes };