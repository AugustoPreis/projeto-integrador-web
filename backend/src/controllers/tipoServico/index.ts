import { TipoServicoController } from './tipoServicoController';
import { TipoServicoRepository } from './tipoServicoRepository';
import { TipoServicoValidator } from './tipoServicoValidator';
import { tipoServicoRoutes } from './tipoServicoRoutes';

const tipoServicoController = new TipoServicoController();
const tipoServicoRepository = new TipoServicoRepository();
const tipoServicoValidator = new TipoServicoValidator();

export {
  tipoServicoController,
  tipoServicoRepository,
  tipoServicoValidator,
  tipoServicoRoutes,
};