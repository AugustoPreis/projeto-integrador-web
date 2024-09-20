import { Servico } from '../../models/Servico';
import { ServicoFuncionario } from '../../models/ServicoFuncionario';
import { isValidString } from '../../utils/validators';
import { Funcionario } from '../funcionario';

export class ServicoFuncionarioValidator {
  private readonly statusValidos = [
    'PENDENTE',
    'ABERTO',
    'EM PROGRESSO',
    'FINALIZADO',
    'CANCELADO',
  ];

  salvar(servicoFuncionario: ServicoFuncionario): void {
    if (!servicoFuncionario) {
      throw new Error('Vínculo Serviço X Funcionário não informado');
    }

    this.validaStatus(servicoFuncionario.status);
    this.validaServico(servicoFuncionario.servico);
    this.validaFuncionario(servicoFuncionario.funcionario);
  }

  validaStatus(status: string): void {
    if (!isValidString(status)) {
      throw new Error('Status do Vínculo Serviço X Funcionário é obrigatório');
    }

    if (!this.statusValidos.includes(status)) {
      throw new Error('Status do Vínculo Serviço X Funcionário inválido');
    }
  }

  validaServico(servico: Servico): void {
    if (!servico) {
      throw new Error('Serviço do Vínculo Serviço X Funcionário é obrigatório');
    }

    if (!(servico instanceof Servico)) {
      throw new Error('Serviço do Vínculo Serviço X Funcionário inválido');
    }
  }

  validaFuncionario(funcionario: Funcionario): void {
    if (!funcionario) {
      throw new Error('Funcionário do Vínculo Serviço X Funcionário é obrigatório');
    }

    if (!(funcionario instanceof Funcionario)) {
      throw new Error('Funcionário do Vínculo Serviço X Funcionário inválido');
    }
  }
}