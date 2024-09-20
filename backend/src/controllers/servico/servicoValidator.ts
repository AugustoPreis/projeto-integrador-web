import { Servico } from '.';
import { TipoServico } from '../tipoServico';
import { Cliente } from '../cliente';
import { Produto } from '../produto';
import { isValidCurrency, isValidNumber, isValidString } from '../../utils/validators';

export class ServicoValidator {

  salvar(servico: Servico): void {
    if (!servico) {
      throw new Error('Serviço não informado');
    }

    this.validaDescricao(servico.descricao);
    this.validaCliente(servico.cliente);
    this.validaProduto(servico.produto);
    this.validaTipoServico(servico.tipoServico);
    this.validaValor(servico.valor);
  }

  atualizar(servico: Servico): void {
    if (!servico) {
      throw new Error('Serviço não informado');
    }

    this.validaDescricao(servico.descricao);
    this.validaValor(servico.valor);
  }

  validaDescricao(descricao: string): void {
    if (!isValidString(descricao)) {
      throw new Error('A descrição do serviço é obrigatória');
    }

    if (descricao.trim().length > 150) {
      throw new Error('A descrição do serviço excede o limite de caracteres (150)');
    }
  }

  validaCliente(cliente: Cliente): void {
    if (!cliente) {
      throw new Error('O cliente do serviço é obrigatório');
    }

    if (!(cliente instanceof Cliente)) {
      throw new Error('Cliente inválido');
    }
  }

  validaProduto(produto: Produto): void {
    if (!produto) {
      throw new Error('O produto do serviço é obrigatório');
    }

    if (!(produto instanceof Produto)) {
      throw new Error('Produto inválido');
    }
  }

  validaTipoServico(tipoServico: TipoServico): void {
    if (!tipoServico) {
      throw new Error('O tipo do serviço é obrigatório');
    }

    if (!(tipoServico instanceof TipoServico)) {
      throw new Error('Tipo de Serviço inválido');
    }
  }

  validaValor(valor: number): void {
    if (!isValidNumber(valor) || valor === 0) {
      return;
    }

    if (!isValidCurrency(valor)) {
      throw new Error('Valor do serviço inválido');
    }
  }
}