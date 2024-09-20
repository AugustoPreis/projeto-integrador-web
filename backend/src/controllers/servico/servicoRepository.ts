import { Database } from '../../database';
import { Servico } from '.';
import { Pagination } from '../../types/Pagination';
import { isValidNumber } from '../../utils/validators';
import { QueryRunner } from 'typeorm';

export class ServicoRepository {
  private readonly database = Database.getRepository(Servico);

  async listagem(params: Partial<Servico> & Pagination): Promise<[Servico[], number]> {
    const qb = this.database
      .createQueryBuilder('servico')
      .innerJoinAndSelect('servico.cliente', 'cliente')
      .innerJoinAndSelect('servico.produto', 'produto')
      .where('servico.ativo IS TRUE');

    if (isValidNumber(params.numero)) {
      qb.andWhere('servico.numero = :numero', { numero: params.numero });
    }

    if (isValidNumber(params.cliente)) {
      qb.andWhere('servico.cliente = :cliente', { cliente: params.cliente });
    }

    if (isValidNumber(params.produto)) {
      qb.andWhere('servico.produto = :produto', { produto: params.produto });
    }

    if (isValidNumber(params.tipoServico)) {
      qb.andWhere('servico.tipoServico = :tipoServico', { tipoServico: params.tipoServico });
    }

    return await qb
      .limit(params.pageSize)
      .offset((params.current - 1) * params.pageSize)
      .orderBy('servico.numero', 'DESC')
      .getManyAndCount();
  }


  async listagemFuncionario(params: Pagination): Promise<[Servico[], number]> {
    return await this.database
      .createQueryBuilder('servico')
      .innerJoinAndSelect('servico.cliente', 'cliente')
      .innerJoinAndSelect('servico.produto', 'produto')
      .where('servico.ativo IS TRUE')
      .limit(params.pageSize)
      .offset((params.current - 1) * params.pageSize)
      .orderBy('servico.id', 'DESC')
      .getManyAndCount();
  }

  async byId(id: number): Promise<Servico> {
    return await this.database
      .createQueryBuilder('servico')
      .innerJoinAndSelect('servico.cliente', 'cliente')
      .innerJoinAndSelect('servico.produto', 'produto')
      .innerJoinAndSelect('servico.tipoServico', 'tipoServico')
      .where('servico.id = :id', { id })
      .getOne();
  }

  async proximoNumero(): Promise<number> {
    const result = await this.database
      .createQueryBuilder('servico')
      .select('MAX(servico.numero)', 'numero')
      .getRawOne();

    if (!isValidNumber(result?.numero)) {
      return 1;
    }

    return result.numero + 1;
  }

  async salvar(params: Servico, qr?: QueryRunner): Promise<Servico> {
    if (qr) {
      return await qr.manager.save(params);
    }

    return await this.database.save(params);
  }
}