import { NextFunction, Request, Response } from 'express';
import { isValidString } from '../../utils/validators';
import { produtoRepository, produtoValidator } from '.';
import { Produto } from '../../models/Produto';
import { currency, string } from '../../utils/normalizers';

export class ProdutoController {

  async listagem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nome, current, pageSize } = req.query;
      const params = {
        nome: '',
        current: 1,
        pageSize: 5,
      }

      if (isValidString(nome)) {
        params.nome = nome.trim();
      }

      if (current && pageSize) {
        params.current = Number(current);
        params.pageSize = Number(pageSize);
      }

      const [data, total] = await produtoRepository.listagem(params);

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

      const result = await produtoRepository.byId(Number(id));

      if (!result) {
        throw new Error(`Produto com ID ${id} não encontrado`);
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async salvar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nome, descricao, valor } = req.body;

      const produto = new Produto();

      produto.nome = string(nome);
      produto.descricao = string(descricao);
      produto.valor = currency(valor, { precision: 2 });

      produtoValidator.salvar(produto);

      const result = await produtoRepository.salvar(produto);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, nome, descricao, valor } = req.body;

      if (!id) {
        throw new Error('ID não informado');
      }

      const produtoDB = await produtoRepository.byId(Number(id));

      if (!produtoDB) {
        throw new Error(`Produto com ID ${id} não encontrado`);
      }

      produtoDB.nome = string(nome);
      produtoDB.descricao = string(descricao);
      produtoDB.valor = currency(valor, { precision: 2 });

      produtoValidator.atualizar(produtoDB);

      const result = await produtoRepository.salvar(produtoDB);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async inativar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.body;

      if (!id) {
        throw new Error('ID não informado');
      }

      const produtoDB = await produtoRepository.byId(Number(id));

      if (!produtoDB) {
        throw new Error(`Produto com ID ${id} não encontrado`);
      }

      produtoDB.ativo = false;

      const result = await produtoRepository.salvar(produtoDB);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }
}