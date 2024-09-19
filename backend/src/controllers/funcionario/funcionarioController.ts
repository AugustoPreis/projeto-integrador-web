import { funcionarioRepository, funcionarioValidator } from '.';
import { isValidString } from '../../utils/validators';
import { Funcionario } from '../../models/Funcionario';
import { NextFunction, Request, Response } from 'express';
import { string } from '../../utils/normalizers';
import { funcaoRepository } from '../funcao';
import { Crypt } from '../../utils/Crypt';

export class FuncionarioController {

  async byLogin(login: string): Promise<Funcionario> {
    if (!isValidString(login)) {
      return null;
    }

    return await funcionarioRepository.byLogin(login);
  }

  async listagem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nome, funcao, current, pageSize } = req.query;
      const params = {
        nome: '',
        funcao: null,
        current: 1,
        pageSize: 5,
      };

      if (isValidString(nome)) {
        params.nome = nome.trim();
      }

      if (funcao) {
        params.funcao = Number(funcao);
      }

      if (current && pageSize) {
        params.current = Number(current);
        params.pageSize = Number(pageSize);
      }

      const [data, total] = await funcionarioRepository.listagem(params);

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

      const result = await funcionarioRepository.byId(Number(id));

      if (!result) {
        throw new Error(`Funcionário com ID ${id} não encontrado`);
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async salvar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nome, login, senha, adm, funcao: codigoFuncao } = req.body;

      const funcionario = new Funcionario();
      const funcao = await funcaoRepository.byId(Number(codigoFuncao || 0));

      funcionario.nome = string(nome);
      funcionario.login = string(login);
      funcionario.adm = !!adm;
      funcionario.senha = Crypt.hash(senha);
      funcionario.funcao = funcao;

      funcionarioValidator.salvar(funcionario);

      const funcionarioDB = await funcionarioRepository.byLogin(funcionario.login);

      if (funcionarioDB) {
        throw new Error('Já existe um funcionário com o mesmo login');
      }

      const result = await funcionarioRepository.salvar(funcionario);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, nome, login, senha, adm, funcao: codigoFuncao } = req.body;

      if (!id) {
        throw new Error('ID não informado');
      }

      const funcionarioDB = await funcionarioRepository.byId(Number(id));
      const funcao = await funcaoRepository.byId(Number(codigoFuncao || 0));

      if (!funcionarioDB) {
        throw new Error(`Funcionário com ID ${id} não encontrado`);
      }

      if (funcionarioDB.login !== login) {
        const funcionarioDB = await funcionarioRepository.byLogin(login);

        if (funcionarioDB && funcionarioDB.id != id) {
          throw new Error('Já existe um funcionário com o mesmo login');
        }
      }

      funcionarioDB.nome = string(nome);
      funcionarioDB.login = string(login);
      funcionarioDB.adm = !!adm;
      funcionarioDB.funcao = funcao;

      if (isValidString(senha)) {
        funcionarioDB.senha = Crypt.hash(senha);
      }

      funcionarioValidator.atualizar(funcionarioDB);

      const result = await funcionarioRepository.salvar(funcionarioDB);

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

      const funcionarioDB = await funcionarioRepository.byId(Number(id));

      if (!funcionarioDB) {
        throw new Error(`Funcionário com ID ${id} não encontrado`);
      }

      funcionarioDB.ativo = false;

      const result = await funcionarioRepository.salvar(funcionarioDB);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }
}