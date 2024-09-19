import { Router } from 'express';
import { funcionarioController } from '.';

const routes = Router();

routes.get('/listagem', (req, res, next) => {
  funcionarioController.listagem(req, res, next);
});

routes.get('/detalhes', (req, res, next) => {
  funcionarioController.detalhes(req, res, next);
});

routes.post('/salvar', (req, res, next) => {
  funcionarioController.salvar(req, res, next);
});

routes.put('/salvar', (req, res, next) => {
  funcionarioController.atualizar(req, res, next);
});

routes.put('/inativar', (req, res, next) => {
  funcionarioController.inativar(req, res, next);
});

export { routes as funcionarioRoutes };