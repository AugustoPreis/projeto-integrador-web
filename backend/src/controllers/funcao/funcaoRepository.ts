import { Funcao } from '.';
import { DeleteResult } from 'typeorm';
import { Database } from '../../database';
import { Pagination } from '../../types/Pagination';

export class FuncaoRepository {
  private readonly database = Database.getRepository(Funcao);

  async listagem(params: { descricao: string } & Pagination): Promise<[Funcao[], number]> {
    return await this.database
      .createQueryBuilder('funcao')
      .where(`funcao.descricao ILIKE '%'||:descricao||'%'`, { descricao: params.descricao })
      .limit(params.pageSize)
      .offset((params.current - 1) * params.pageSize)
      .orderBy('funcao.descricao')
      .getManyAndCount();
  }

  async byId(id: number): Promise<Funcao> {
    return await this.database
      .createQueryBuilder('funcao')
      .where('funcao.id = :id', { id })
      .getOne();
  }

  async salvar(funcao: Funcao): Promise<Funcao> {
    return await this.database.save(funcao);
  }

  async deletar(id: number): Promise<DeleteResult> {
    return await this.database.delete(id);
  }
}