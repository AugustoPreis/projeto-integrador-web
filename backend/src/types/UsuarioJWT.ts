import { Cliente } from '../controllers/cliente';
import { Funcionario } from '../controllers/funcionario';

export interface UsuarioJWT {
  id: number;
  nome: string;
  tipo: string;
  funcionario: Funcionario;
  cliente: Cliente;
}