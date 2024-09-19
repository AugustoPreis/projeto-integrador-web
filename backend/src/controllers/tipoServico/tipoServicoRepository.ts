import { DeleteResult } from 'typeorm';
import { Database } from '../../database';
import { TipoServico } from '.';
import { Pagination } from '../../types/Pagination';

export class TipoServicoRepository {
  private readonly database = Database.getRepository(TipoServico);

  async listagem(params: { descricao: string } & Pagination): Promise<[TipoServico[], number]> {
    return await this.database
      .createQueryBuilder('ts')
      .where(`ts.descricao ILIKE '%'||:descricao||'%'`, { descricao: params.descricao })
      .limit(params.pageSize)
      .offset((params.current - 1) * params.pageSize)
      .orderBy('ts.descricao', 'ASC')
      .getManyAndCount();
  }

  async byId(id: number): Promise<TipoServico> {
    return await this.database
      .createQueryBuilder('ts')
      .where('ts.id = :id', { id })
      .getOne();
  }

  async salvar(params: TipoServico): Promise<TipoServico> {
    return await this.database.save(params);
  }

  async deletar(id: number): Promise<DeleteResult> {
    return await this.database.delete(id);
  }
}