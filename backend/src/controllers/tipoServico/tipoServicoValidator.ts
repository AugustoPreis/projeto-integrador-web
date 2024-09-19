import { TipoServico } from '../../models/TipoServico';
import { isValidString } from '../../utils/validators';

export class TipoServicoValidator {

  salvar(tipoServico: TipoServico): void {
    if (!tipoServico) {
      throw new Error('Tipo de serviço não informado');
    }

    this.validaDescricao(tipoServico.descricao);
    this.validaPagador(tipoServico.pagador);
  }

  atualizar(tipoServico: TipoServico): void {
    if (!tipoServico) {
      throw new Error('Tipo de serviço não informado');
    }

    this.validaDescricao(tipoServico.descricao);
    this.validaPagador(tipoServico.pagador);
  }

  validaDescricao(descricao: string): void {
    if (!isValidString(descricao)) {
      throw new Error('A descrição do tipo de serviço é obrigatória');
    }

    if (descricao.trim().length > 100) {
      throw new Error('A descrição do tipo de serviço excede o limite de caracteres (100)');
    }
  }

  validaPagador(pagador: string) {
    if (!isValidString(pagador)) {
      throw new Error('O pagador do tipo de serviço é obrigatório');
    }

    if (!['C', 'E'].includes(pagador)) {
      throw new Error('O pagador do tipo de serviço deve ser "Cliente" ou "Empresa"');
    }
  }
}