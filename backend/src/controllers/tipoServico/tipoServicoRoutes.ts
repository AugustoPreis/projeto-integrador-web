import { Router } from 'express';
import { tipoServicoController } from '.';

const routes = Router();

routes.get('/listagem', (req, res, next) => {
  tipoServicoController.listagem(req, res, next);
});

routes.get('/detalhes', (req, res, next) => {
  tipoServicoController.detalhes(req, res, next);
});

routes.post('/salvar', (req, res, next) => {
  tipoServicoController.salvar(req, res, next);
});

routes.put('/salvar', (req, res, next) => {
  tipoServicoController.atualizar(req, res, next);
});

routes.delete('/deletar', (req, res, next) => {
  tipoServicoController.deletar(req, res, next);
});

export { routes as tipoServicoRoutes };