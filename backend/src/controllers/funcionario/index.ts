import { Funcionario } from '../../models/Funcionario';
import { FuncionarioController } from './funcionarioController';
import { FuncionarioRepository } from './funcionarioRepository';
import { funcionarioRoutes } from './funcionarioRoutes';
import { FuncionarioValidator } from './funcionarioValidator';

const funcionarioController = new FuncionarioController();
const funcionarioRepository = new FuncionarioRepository();
const funcionarioValidator = new FuncionarioValidator();

export {
  Funcionario,
  funcionarioController,
  funcionarioRepository,
  funcionarioValidator,
  funcionarioRoutes,
}