import { Cliente, clienteRepository, clienteValidator } from '.';
import { isDate, isBefore, isAfter, format } from 'date-fns';
import { isValidString } from '../../utils/validators';
import { NextFunction, Request, Response } from 'express';
import { date, string } from '../../utils/normalizers';
import { Crypt } from '../../utils/Crypt';

export class ClienteController {

  async byLogin(login: string): Promise<Cliente> {
    if (!isValidString(login)) {
      return null;
    }

    const cliente = await clienteRepository.byLogin(login);

    if (!cliente) {
      return null;
    }

    const { inicioAcesso, fimAcesso } = cliente;

    if (isDate(inicioAcesso) && isBefore(new Date(), inicioAcesso)) {
      throw new Error(`O cliente ainda não pode acessar o sistema. Data de liberação: ${format(inicioAcesso, 'dd/MM/yyyy HH:mm')}`);
    }

    if (isDate(fimAcesso) && isAfter(new Date(), fimAcesso)) {
      throw new Error(`O cliente não pode mais acessar o sistema. Data de bloqueio: ${format(fimAcesso, 'dd/MM/yyyy HH:mm')}`);
    }

    return cliente;
  }

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

      const [data, total] = await clienteRepository.listagem(params);

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

      const result = await clienteRepository.detalhes(Number(id));

      if (!result) {
        throw new Error(`Cliente com ID ${id} não encontrado`);
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async salvar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nome, telefone, email, login, senha, inicioAcesso, fimAcesso } = req.body;

      const cliente = new Cliente();

      cliente.nome = string(nome);
      cliente.telefone = string(telefone);
      cliente.email = string(email);
      cliente.login = string(login);
      cliente.senha = Crypt.hash(string(senha, { trim: false }));
      cliente.inicioAcesso = date(inicioAcesso);
      cliente.fimAcesso = date(fimAcesso);
      cliente.ativo = true;

      clienteValidator.salvar(cliente);

      const clienteDB = await clienteRepository.byLogin(cliente.login);

      if (clienteDB) {
        throw new Error('Já existe um cliente com o mesmo login');
      }

      const result = await clienteRepository.salvar(cliente);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, nome, telefone, email, login, senha, inicioAcesso, fimAcesso } = req.body;

      if (!id) {
        throw new Error('ID não informado');
      }

      const clienteDB = await clienteRepository.detalhes(Number(id));

      if (!clienteDB) {
        throw new Error(`Cliente com ID ${id} não encontrado`);
      }

      if (clienteDB.login != login) {
        const clienteDB = await clienteRepository.byLogin(login);

        if (clienteDB && clienteDB.id != id) {
          throw new Error('Já existe um cliente com o mesmo login');
        }
      }

      clienteDB.nome = string(nome);
      clienteDB.telefone = string(telefone);
      clienteDB.email = string(email, { lower: true });
      clienteDB.login = string(login);
      clienteDB.inicioAcesso = date(inicioAcesso);
      clienteDB.fimAcesso = date(fimAcesso);

      if (isValidString(senha)) {
        clienteDB.senha = Crypt.hash(string(senha, { trim: false }));
      }

      clienteValidator.atualizar(clienteDB);

      const result = await clienteRepository.salvar(clienteDB);

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

      const clienteDB = await clienteRepository.detalhes(Number(id));

      if (!clienteDB) {
        throw new Error(`Cliente com ID ${id} não encontrado`);
      }

      clienteDB.ativo = false;

      const result = await clienteRepository.salvar(clienteDB);

      res.status(200).json(result);
    } catch (err) {
      res.status(404);
      next(err);
    }
  }
}