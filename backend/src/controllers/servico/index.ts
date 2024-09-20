import { Servico } from '../../models/Servico';
import { ServicoController } from './servicoController';
import { ServicoRepository } from './servicoRepository';
import { ServicoValidator } from './servicoValidator';
import { servicoRoutes } from './servicoRoutes';

const servicoController = new ServicoController();
const servicoRepository = new ServicoRepository();
const servicoValidator = new ServicoValidator();

export {
  Servico,
  servicoController,
  servicoRepository,
  servicoValidator,
  servicoRoutes,
}