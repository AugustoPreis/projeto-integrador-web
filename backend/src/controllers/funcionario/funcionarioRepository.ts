import { Database } from '../../database';
import { Funcionario } from '../../models/Funcionario';
import { Pagination } from '../../types/Pagination';

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

  async listagem(params: { nome: string, funcao: number } & Pagination): Promise<[Funcionario[], number]> {
    const qb = this.database
      .createQueryBuilder('func')
      .innerJoinAndSelect('func.funcao', 'funcao')
      .where('func.ativo IS TRUE')
      .andWhere(`func.nome ILIKE '%'||:nome||'%'`, { nome: params.nome });

    if (params.funcao) {
      qb.andWhere('func.funcao = :funcao', { funcao: params.funcao });
    }

    return await qb
      .limit(params.pageSize)
      .offset((params.current - 1) * params.pageSize)
      .orderBy('func.nome')
      .getManyAndCount();
  }

  async byId(id: number): Promise<Funcionario> {
    return await this.database
      .createQueryBuilder('func')
      .innerJoinAndSelect('func.funcao', 'funcao')
      .where('func.id = :id', { id })
      .getOne();
  }

  async salvar(funcionario: Funcionario): Promise<Funcionario> {
    return await this.database.save(funcionario);
  }
}