import { Funcao } from '../../models/Funcao';
import { Funcionario } from '../../models/Funcionario';
import { isValidString } from '../../utils/validators';

export class FuncionarioValidator {

  salvar(funcionario: Funcionario): void {
    if (!funcionario) {
      throw new Error('Funcionário não informado');
    }

    this.validaNome(funcionario.nome);
    this.validaLogin(funcionario.login);
    this.validaSenha(funcionario.senha);
    this.validaFuncao(funcionario.funcao);
  }

  atualizar(funcionario: Funcionario): void {
    if (!funcionario) {
      throw new Error('Funcionário não informado');
    }

    this.validaNome(funcionario.nome);
    this.validaLogin(funcionario.login);
    this.validaFuncao(funcionario.funcao);
  }

  validaNome(nome: unknown): void {
    if (!isValidString(nome)) {
      throw new Error('O nome do funcionário é obrigatório');
    }

    if (nome.trim().length > 150) {
      throw new Error('O nome do funcionário excede o limite de caracteres (150)');
    }
  }

  validaLogin(login: unknown): void {
    if (!isValidString(login)) {
      throw new Error('O login do funcionário é obrigatório');
    }

    if (login.trim().length > 100) {
      throw new Error('O login do funcionário excede o limite de caracteres (100)');
    }
  }

  validaSenha(senha: unknown): void {
    if (!isValidString(senha)) {
      throw new Error('A senha do funcionário é obrigatória');
    }
  }

  validaFuncao(funcao: unknown): void {
    if (!funcao) {
      throw new Error('A função do funcionário é obrigatória');
    }

    if (!(funcao instanceof Funcao)) {
      throw new Error('A função do funcionário é inválida');
    }
  }
}