import { ServicoFuncionario } from '../../models/ServicoFuncionario';
import { ServicoFuncionarioController } from './servicoFuncionarioController';
import { ServicoFuncionarioRepository } from './servicoFuncionarioRepository';
import { ServicoFuncionarioValidator } from './servicoFuncionarioValidator';

const servicoFuncionarioController = new ServicoFuncionarioController();
const servicoFuncionarioRepository = new ServicoFuncionarioRepository();
const servicoFuncionarioValidator = new ServicoFuncionarioValidator();

export {
  ServicoFuncionario,
  servicoFuncionarioController,
  servicoFuncionarioRepository,
  servicoFuncionarioValidator,
}