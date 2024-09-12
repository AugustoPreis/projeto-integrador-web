import { Database } from '../../database';
import { Funcionario } from '../../models/Funcionario';

export class FuncionarioRepository {
  private readonly database = Database.getRepository(Funcionario);

  async byLogin(login: string): Promise<Funcionario> {
    return await this.database
      .createQueryBuilder('func')
      .addSelect('func.senha')
      .innerJoinAndSelect('func.funcao', 'funcao')
      .where('func.login ILIKE :login', { login })
      .andWhere('func.ativo IS TRUE')
      .getOne();
  }
}