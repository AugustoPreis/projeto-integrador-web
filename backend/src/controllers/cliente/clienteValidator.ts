import { isDate } from 'date-fns';
import { isValidString } from '../../utils/validators';
import { Cliente } from '.';
import { EMAIL_VALIDATOR } from '../../utils/regex';

export class ClienteValidator {

  salvar(cliente: Cliente): void {
    if (!cliente) {
      throw new Error('Cliente não informado');
    }

    this.validaNome(cliente.nome);
    this.validaTelefone(cliente.telefone);
    this.validaEmail(cliente.email);
    this.validaLogin(cliente.login);
    this.validaSenha(cliente.senha);
    this.validaInicioAcesso(cliente.inicioAcesso);
    this.validaFimAcesso(cliente.fimAcesso);
  }

  atualizar(cliente: Cliente): void {
    if (!cliente) {
      throw new Error('Cliente não informado');
    }

    this.validaNome(cliente.nome);
    this.validaTelefone(cliente.telefone);
    this.validaEmail(cliente.email);
    this.validaLogin(cliente.login);
    this.validaInicioAcesso(cliente.inicioAcesso);
    this.validaFimAcesso(cliente.fimAcesso);
  }

  validaNome(nome: unknown): void {
    if (!isValidString(nome)) {
      throw new Error('O nome do cliente é obrigatório');
    }

    if (nome.trim().length > 150) {
      throw new Error('O nome do cliente excede o limite de caracteres (150)');
    }
  }

  validaTelefone(telefone: unknown): void {
    if (!isValidString(telefone)) {
      return;
    }

    if (telefone.trim().length > 20) {
      throw new Error('O telefone do cliente excede o limite de caracteres (20)');
    }
  }

  validaEmail(email: unknown): void {
    if (!isValidString(email)) {
      return;
    }

    if (email.trim().length > 100) {
      throw new Error('O e-mail do cliente excede o limite de caracteres (100)');
    }

    if (!EMAIL_VALIDATOR.test(email.toLowerCase())) {
      throw new Error('E-mail inválido');
    }
  }

  validaLogin(login: unknown): void {
    if (!isValidString(login)) {
      throw new Error('O login do cliente é obrigatório');
    }

    if (login.trim().length > 100) {
      throw new Error('O login do cliente excede o limite de caracteres (100)');
    }
  }

  validaSenha(senha: unknown): void {
    if (!isValidString(senha)) {
      throw new Error('A senha do cliente é obrigatória');
    }
  }

  validaInicioAcesso(inicioAcesso: unknown): void {
    if (!inicioAcesso) {
      throw new Error('Data de início de acesso é obrigatória');
    }

    if (!isDate(inicioAcesso)) {
      throw new Error('Data de início de acesso inválida');
    }
  }

  validaFimAcesso(fimAcesso: unknown): void {
    if (!fimAcesso) {
      return;
    }

    if (!isDate(fimAcesso)) {
      throw new Error('Data de início de acesso inválida');
    }
  }
}