import { FuncaoController } from './funcaoController';
import { FuncaoRepository } from './funcaoRepository';
import { funcaoRoutes } from './funcaoRoutes';

const funcaoController = new FuncaoController();
const funcaoRepository = new FuncaoRepository();

export { funcaoController, funcaoRepository, funcaoRoutes };