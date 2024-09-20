import { QueryRunner } from 'typeorm';
import { ServicoFuncionario, servicoFuncionarioRepository, servicoFuncionarioValidator } from '.';
import { NextFunction, Request, Response } from 'express';
import { idParam, string } from '../../utils/normalizers';
import { funcionarioRepository } from '../funcionario';
import { servicoRepository } from '../servico';

export class ServicoFuncionarioController {

  async historico(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { servico } = req.query;

      if (!servico) {
        throw new Error('Serviço não informado');
      }

      const result = await servicoFuncionarioRepository.byServico(Number(servico));

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async statusAtual(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { servico } = req.query;

      if (!servico) {
        throw new Error('Serviço não informado');
      }

      const result = await servicoFuncionarioRepository.statusAtual(Number(servico));

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async alterarStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { servico, funcionario, status } = req.body;

      const servicoFuncionario = new ServicoFuncionario();

      servicoFuncionario.status = string(status);
      servicoFuncionario.funcionario = await funcionarioRepository.byId(idParam(funcionario));
      servicoFuncionario.servico = await servicoRepository.byId(idParam(servico));

      servicoFuncionarioValidator.salvar(servicoFuncionario);

      const result = await servicoFuncionarioRepository.salvar(servicoFuncionario);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async salvar(params: ServicoFuncionario, qr?: QueryRunner): Promise<ServicoFuncionario> {
    const servicoFuncionario = new ServicoFuncionario();

    servicoFuncionario.status = string(params.status);
    servicoFuncionario.servico = params.servico;
    servicoFuncionario.funcionario = params.funcionario;

    servicoFuncionarioValidator.salvar(servicoFuncionario);

    return await servicoFuncionarioRepository.salvar(servicoFuncionario, qr);
  }
}