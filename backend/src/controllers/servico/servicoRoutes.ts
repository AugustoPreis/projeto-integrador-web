import { Router } from 'express';
import { servicoController } from '.';

const routes = Router();

routes.get('/listagem', (req, res, next) => {
  servicoController.listagem(req, res, next);
});

routes.get('/detalhes', (req, res, next) => {
  servicoController.detalhes(req, res, next);
});

routes.post('/salvar', (req, res, next) => {
  servicoController.salvar(req, res, next);
});

routes.put('/salvar', (req, res, next) => {
  servicoController.atualizar(req, res, next);
});

routes.put('/inativar', (req, res, next) => {
  servicoController.inativar(req, res, next);
});

export { routes as servicoRoutes };