import { Funcionario } from '../../models/Funcionario';
import { FuncionarioController } from './funcionarioController';
import { FuncionarioRepository } from './funcionarioRepository';

const funcionarioController = new FuncionarioController();
const funcionarioRepository = new FuncionarioRepository();

export {
  Funcionario,
  funcionarioController,
  funcionarioRepository,
}