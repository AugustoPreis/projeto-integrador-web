import { Funcao } from '../../models/Funcao';
import { FuncaoController } from './funcaoController';
import { FuncaoRepository } from './funcaoRepository';
import { funcaoRoutes } from './funcaoRoutes';

const funcaoController = new FuncaoController();
const funcaoRepository = new FuncaoRepository();

export {
  Funcao,
  funcaoController,
  funcaoRepository,
  funcaoRoutes,
};