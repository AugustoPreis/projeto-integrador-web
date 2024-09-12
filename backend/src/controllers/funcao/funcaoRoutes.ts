import { Router } from 'express';
import { funcaoController } from '.';

const routes = Router();

routes.get('/listagem', (req, res, next) => {
  funcaoController.listagem(req, res, next);
});

export { routes as funcaoRoutes };