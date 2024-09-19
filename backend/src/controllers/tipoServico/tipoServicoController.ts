import { NextFunction, Request, Response } from 'express';
import { isValidString } from '../../utils/validators';
import { tipoServicoRepository, tipoServicoValidator } from '.';
import { TipoServico } from '../../models/TipoServico';
import { string } from '../../utils/normalizers';

export class TipoServicoController {

  async listagem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { descricao, current, pageSize } = req.query;
      const params = {
        descricao: '',
        current: 1,
        pageSize: 5,
      }

      if (isValidString(descricao)) {
        params.descricao = descricao.trim();
      }

      if (current && pageSize) {
        params.current = Number(current);
        params.pageSize = Number(pageSize);
      }

      const [data, total] = await tipoServicoRepository.listagem(params);

      res.status(200).json({ data, total });
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async detalhes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.query;

      if (!id) {
        throw new Error('ID não informado');
      }

      const result = await tipoServicoRepository.byId(Number(id));

      if (!result) {
        throw new Error(`Tipo de serviço com ID ${id} não encontrado`);
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async salvar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { descricao, pagador } = req.body;

      const tipoServico = new TipoServico();

      tipoServico.descricao = string(descricao);
      tipoServico.pagador = string(pagador);

      tipoServicoValidator.salvar(tipoServico);

      const result = await tipoServicoRepository.salvar(tipoServico);

      res.status(201).json(result);
    } catch (err) {
      res.status(400);
      next(err);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, descricao, pagador } = req.body;

      if (!id) {
        throw new Error('ID não informado');
      }

      const tipoServicoDB = await tipoServicoRepository.byId(Number(id));

      if (!tipoServicoDB) {
        throw new Error(`Tipo de serviço com ID ${id} não encontrado`);
      }

      tipoServicoDB.descricao = string(descricao);
      tipoServicoDB.pagador = string(pagador);

      tipoServicoValidator.atualizar(tipoServicoDB);

      const result = await tipoServicoRepository.salvar(tipoServicoDB);

      res.status(200).json(result);
    } catch (err) {
      res.status(400);
      next(err);
    }
  }

  async deletar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.query;

      if (!id) {
        throw new Error('ID não informado');
      }

      const result = await tipoServicoRepository.deletar(Number(id));

      if (!result || result.affected === 0) {
        throw new Error(`Função com ID ${id} não encontrada`);
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(400);
      next(err);
    }
  }
}