import { NextFunction, Request, Response } from 'express';
import { Servico, servicoRepository, servicoValidator } from '.';
import { currency, idParam, string } from '../../utils/normalizers';
import { clienteRepository } from '../cliente';
import { produtoRepository } from '../produto';
import { tipoServicoRepository } from '../tipoServico';
import { QueryRunner } from 'typeorm';
import { commit, getQueryRunner, rollback } from '../../database';
import { ServicoFuncionario, servicoFuncionarioController, servicoFuncionarioRepository } from '../servicoFuncionario';
import { funcionarioRepository } from '../funcionario';

export class ServicoController {

  async listagem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { numero, cliente, produto, tipoServico, current, pageSize } = req.query;
      const params = {
        numero: null,
        cliente: null,
        produto: null,
        tipoServico: null,
        current: 1,
        pageSize: 5,
      }

      if (numero) {
        params.numero = Number(numero);
      }

      if (cliente) {
        params.cliente = Number(cliente);
      }

      if (produto) {
        params.produto = Number(produto);
      }

      if (tipoServico) {
        params.tipoServico = Number(tipoServico);
      }

      if (current && pageSize) {
        params.current = Number(current);
        params.pageSize = Number(pageSize);
      }

      const [itens, total] = await servicoRepository.listagem(params);

      const data = await this.adicionaStatus(itens);

      res.status(200).json({ data, total });
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async listagemFuncionario(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { funcionario, current, pageSize } = req.query;
      const params = {
        funcionario: null,
        current: 1,
        pageSize: 5,
      };

      if (funcionario) {
        params.funcionario = Number(funcionario);
      }

      if (current && pageSize) {
        params.current = Number(current);
        params.pageSize = Number(pageSize);
      }

      const [itens, total] = await servicoRepository.listagemFuncionario(params);

      const data = await this.adicionaStatus(itens);

      res.status(200).json({ data, total });
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async listagemCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = {
        cliente: req.user.cliente?.id,
      };

      if (!params.cliente) {
        throw new Error('Cliente não informado');
      }

      const data = await servicoRepository.listagemCliente(params);

      const result = await this.adicionaStatus(data);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async adicionaStatus(data: Servico[]): Promise<(Servico & { status: string })[]> {
    const itens = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i] as Servico & { status: string };

      const servicoFuncionario = await servicoFuncionarioRepository.statusAtual(item.id);

      item.status = servicoFuncionario?.status;

      itens.push(item);
    }

    return itens;
  }

  async detalhes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.query;

      if (!id) {
        throw new Error('ID não informado');
      }

      const result = await servicoRepository.byId(Number(id));

      if (!result) {
        throw new Error(`Serviço com ID ${id} não encontrado`);
      }

      const status = await servicoFuncionarioRepository.byServico(result.id);

      res.status(200).json({ ...result, status });
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async salvar(req: Request, res: Response, next: NextFunction): Promise<void> {
    let qr: QueryRunner;

    try {
      const { descricao, observacao, valor, cliente, produto, tipoServico, funcionario } = req.body;

      const servico = new Servico();

      servico.numero = await servicoRepository.proximoNumero();
      servico.descricao = string(descricao);
      servico.observacao = string(observacao);
      servico.valor = currency(valor);
      servico.cliente = await clienteRepository.detalhes(idParam(cliente));
      servico.produto = await produtoRepository.byId(idParam(produto));
      servico.tipoServico = await tipoServicoRepository.byId(idParam(tipoServico));
      servico.dataCadastro = new Date();

      servicoValidator.salvar(servico);

      qr = await getQueryRunner();

      const result = await servicoRepository.salvar(servico, qr);

      const servicoFuncionario = new ServicoFuncionario();

      servicoFuncionario.servico = result;
      servicoFuncionario.funcionario = await funcionarioRepository.byId(idParam(funcionario));
      servicoFuncionario.status = 'ABERTO';

      await servicoFuncionarioController.salvar(servicoFuncionario, qr);

      await commit(qr);

      res.status(200).json(result);
    } catch (err) {
      await rollback(qr);

      res.status(404);
      next(err);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, descricao, observacao, valor } = req.body;

      if (!id) {
        throw new Error('ID não informado');
      }

      const servicoDB = await servicoRepository.byId(Number(id));

      if (!servicoDB) {
        throw new Error(`Serviço com ID ${id} não encontrado`);
      }

      servicoDB.descricao = string(descricao);
      servicoDB.observacao = string(observacao);
      servicoDB.valor = currency(valor);

      servicoValidator.atualizar(servicoDB);

      const result = await servicoRepository.salvar(servicoDB);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async inativar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.body;

      if (!req.user.funcionario?.adm) {
        throw new Error('Apenas administradores podem inativar serviços');
      }

      if (!id) {
        throw new Error('ID não informado');
      }

      const servicoDB = await servicoRepository.byId(Number(id));

      if (!servicoDB) {
        throw new Error(`Serviço com ID ${id} não encontrado`);
      }

      servicoDB.ativo = false;

      const result = await servicoRepository.salvar(servicoDB);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }
}