import { TipoServico } from '../../models/TipoServico';
import { TipoServicoController } from './tipoServicoController';
import { TipoServicoRepository } from './tipoServicoRepository';
import { TipoServicoValidator } from './tipoServicoValidator';
import { tipoServicoRoutes } from './tipoServicoRoutes';

const tipoServicoController = new TipoServicoController();
const tipoServicoRepository = new TipoServicoRepository();
const tipoServicoValidator = new TipoServicoValidator();

export {
  TipoServico,
  tipoServicoController,
  tipoServicoRepository,
  tipoServicoValidator,
  tipoServicoRoutes,
};