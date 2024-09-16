import { Cliente } from '../../models/Cliente';
import { ClienteController } from './clienteController';
import { ClienteRepository } from './clienteRepository';
import { clienteRoutes } from './clienteRoutes';
import { ClienteValidator } from './clienteValidator';

const clienteController = new ClienteController();
const clienteRepository = new ClienteRepository();
const clienteValidator = new ClienteValidator();

export {
  Cliente,
  clienteController,
  clienteRepository,
  clienteValidator,
  clienteRoutes,
};