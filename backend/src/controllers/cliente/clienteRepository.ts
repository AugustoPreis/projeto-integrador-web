import { Cliente } from '.';
import { Database } from '../../database';
import { Pagination } from '../../types/Pagination';
import { DeleteResult } from 'typeorm';

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

  async listagem(params: { nome: string } & Pagination): Promise<[Cliente[], number]> {
    return await this.database
      .createQueryBuilder('cliente')
      .where(`cliente.nome ILIKE '%'||:nome||'%'`, { nome: params.nome })
      .andWhere('cliente.ativo IS TRUE')
      .limit(params.pageSize)
      .offset((params.current - 1) * params.pageSize)
      .orderBy('cliente.nome')
      .getManyAndCount();
  }

  async detalhes(id: number): Promise<Cliente> {
    return await this.database
      .createQueryBuilder('cliente')
      .where('cliente.id = :id', { id })
      .getOne();
  }

  async salvar(cliente: Cliente): Promise<Cliente> {
    return await this.database.save(cliente);
  }

  async deletar(id: number): Promise<DeleteResult> {
    return await this.database.delete(id);
  }
}