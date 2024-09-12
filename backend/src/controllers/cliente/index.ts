import { Cliente } from '../../models/Cliente';
import { ClienteController } from './clienteController';
import { ClienteRepository } from './clienteRepository';

const clienteController = new ClienteController();
const clienteRepository = new ClienteRepository();

export {
  Cliente,
  clienteController,
  clienteRepository,
};