import { Cliente, clienteRepository } from '.';
import { isDate, isBefore, isAfter, format } from 'date-fns';
import { isValidString } from '../../utils/validators';

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
}