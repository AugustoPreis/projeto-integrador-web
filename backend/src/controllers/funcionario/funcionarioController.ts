import { funcionarioRepository } from '.';
import { isValidString } from '../../utils/validators';
import { Funcionario } from '../../models/Funcionario';

export class FuncionarioController {

  async byLogin(login: string): Promise<Funcionario> {
    if (!isValidString(login)) {
      return null;
    }

    return await funcionarioRepository.byLogin(login);
  }
}