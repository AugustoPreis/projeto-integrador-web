import { Database } from '../../database';
import { Funcao } from '../../models/Funcao';
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
}