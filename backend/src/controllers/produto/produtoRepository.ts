import { Database } from '../../database';
import { Produto } from '../../models/Produto';
import { Pagination } from '../../types/Pagination';

export class ProdutoRepository {
  private readonly database = Database.getRepository(Produto);

  async listagem(params: { nome: string } & Pagination): Promise<[Produto[], number]> {
    return await this.database
      .createQueryBuilder('produto')
      .where('produto.ativo IS TRUE')
      .andWhere(`produto.nome ILIKE '%'||:nome||'%'`, { nome: params.nome })
      .limit(params.pageSize)
      .offset((params.current - 1) * params.pageSize)
      .orderBy('produto.nome')
      .getManyAndCount();
  }

  async byId(id: number): Promise<Produto> {
    return await this.database
      .createQueryBuilder('produto')
      .where('produto.id = :id', { id })
      .getOne();
  }

  async salvar(produto: Produto): Promise<Produto> {
    return await this.database.save(produto);
  }
}