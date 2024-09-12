import { NextFunction, Request, Response } from 'express';
import { funcaoRepository } from '.';

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
}