import { Router } from 'express';
import { clienteController } from '.';

const routes = Router();

routes.get('/listagem', (req, res, next) => {
  clienteController.listagem(req, res, next);
});

routes.get('/detalhes', (req, res, next) => {
  clienteController.detalhes(req, res, next);
});

routes.post('/salvar', (req, res, next) => {
  clienteController.salvar(req, res, next);
});

routes.put('/salvar', (req, res, next) => {
  clienteController.atualizar(req, res, next);
});

routes.put('/inativar', (req, res, next) => {
  clienteController.inativar(req, res, next);
});

export { routes as clienteRoutes };