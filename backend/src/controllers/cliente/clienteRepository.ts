import { Cliente } from '../../models/Cliente';
import { Database } from '../../database';

export class ClienteRepository {
  private readonly database = Database.getRepository(Cliente);

  async byLogin(login: string): Promise<Cliente> {
    return await this.database
      .createQueryBuilder('cliente')
      .addSelect('cliente.senha')
      .where('cliente.login ILIKE :login', { login })
      .andWhere('cliente.ativo IS TRUE')
      .getOne();
  }
}