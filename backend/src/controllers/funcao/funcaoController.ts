import { NextFunction, Request, Response } from 'express';
import { funcaoRepository } from '.';
import { isValidString } from '../../utils/validators';
import { Funcao } from '../../models/Funcao';

export class FuncaoController {

  async listagem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { descricao, current, pageSize } = req.query;
      const params = {
        descricao: '',
        current: 1,
        pageSize: 5,
      };

      if (typeof descricao === 'string') {
        params.descricao = descricao.trim();
      }

      if (current && pageSize) {
        params.current = Number(current);
        params.pageSize = Number(pageSize);
      }

      const [data, total] = await funcaoRepository.listagem(params);

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

      const result = await funcaoRepository.byId(Number(id));

      if (!result) {
        throw new Error(`Função com ID ${id} não encontrada`);
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async salvar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { descricao } = req.body;

      if (!isValidString(descricao)) {
        throw new Error('A descrição é obrigatória');
      }

      const funcao = new Funcao();

      funcao.descricao = descricao.trim();

      const result = await funcaoRepository.salvar(funcao);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, descricao } = req.body;

      if (!id) {
        throw new Error('ID não informado');
      }

      if (!isValidString(descricao)) {
        throw new Error('A descrição é obrigatória');
      }

      const funcaoDB = await funcaoRepository.byId(Number(id));

      if (!funcaoDB) {
        throw new Error(`Função com ID ${id} não encontrada`);
      }

      funcaoDB.descricao = descricao.trim();

      const result = await funcaoRepository.salvar(funcaoDB);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async deletar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.query;

      if (!id) {
        throw new Error('ID não informado');
      }

      const result = await funcaoRepository.deletar(Number(id));

      if (!result || result.affected === 0) {
        throw new Error(`Função com ID ${id} não encontrada`);
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }
}