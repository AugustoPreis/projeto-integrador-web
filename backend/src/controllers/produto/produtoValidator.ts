import { Produto } from '../../models/Produto';
import { isValidCurrency, isValidString } from '../../utils/validators';

export class ProdutoValidator {

  salvar(produto: Produto): void {
    if (!produto) {
      throw new Error('Produto não informado');
    }

    this.validaNome(produto.nome);
    this.validaValor(produto.valor);
  }

  atualizar(produto: Produto): void {
    if (!produto) {
      throw new Error('Produto não informado');
    }

    this.validaNome(produto.nome);
    this.validaValor(produto.valor);
  }

  validaNome(nome: string): void {
    if (!isValidString(nome)) {
      throw new Error('O nome do produto é obrigatório');
    }

    if (nome.trim().length > 150) {
      throw new Error('O nome do produto deve ter no máximo 150 caracteres');
    }
  }

  validaValor(valor: number): void {
    if (!isValidCurrency(valor)) {
      throw new Error('O valor do produto é obrigatório');
    }
  }
}