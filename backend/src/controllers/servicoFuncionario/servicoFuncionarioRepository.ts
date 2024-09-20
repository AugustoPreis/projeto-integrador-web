import { QueryRunner } from 'typeorm';
import { Database } from '../../database';
import { ServicoFuncionario } from '../../models/ServicoFuncionario';

export class ServicoFuncionarioRepository {
  private readonly database = Database.getRepository(ServicoFuncionario);

  async byServico(servico: number): Promise<ServicoFuncionario[]> {
    return await this.database
      .createQueryBuilder('sf')
      .innerJoinAndSelect('sf.servico', 'servico')
      .innerJoinAndSelect('sf.funcionario', 'funcionario')
      .where('sf.servico = :servico', { servico })
      .orderBy('sf.id', 'DESC')
      .getMany();
  }

  async statusAtual(servico: number): Promise<ServicoFuncionario> {
    return await this.database
      .createQueryBuilder('sf')
      .innerJoinAndSelect('sf.funcionario', 'funcionario')
      .where('sf.servico = :servico', { servico })
      .orderBy('sf.id', 'DESC')
      .limit(1)
      .getOne();
  }

  async salvar(params: ServicoFuncionario, qr?: QueryRunner): Promise<ServicoFuncionario> {
    if (qr) {
      return await qr.manager.save(params);
    }

    return this.database.save(params);
  }
}