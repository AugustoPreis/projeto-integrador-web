import { Router } from 'express';
import { funcaoController } from '.';

const routes = Router();

routes.get('/listagem', (req, res, next) => {
  funcaoController.listagem(req, res, next);
});

routes.get('/detalhes', (req, res, next) => {
  funcaoController.detalhes(req, res, next);
});

routes.post('/salvar', (req, res, next) => {
  funcaoController.salvar(req, res, next);
});

routes.put('/salvar', (req, res, next) => {
  funcaoController.atualizar(req, res, next);
});

routes.delete('/deletar', (req, res, next) => {
  funcaoController.deletar(req, res, next);
});

export { routes as funcaoRoutes };