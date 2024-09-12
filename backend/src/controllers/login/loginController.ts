import { NextFunction, Request, Response } from 'express';
import { isValidString } from '../../utils/validators';
import { Funcionario, funcionarioController } from '../funcionario';
import { Cliente, clienteController } from '../cliente';
import { Crypt } from '../../utils/Crypt';
import { UsuarioJWT } from '../../types/UsuarioJWT';
import { sign } from '../../providers/jwt';

export class LoginController {

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { login, senha, tipo } = req.body;

      if (!isValidString(login) || !isValidString(senha)) {
        throw new Error('Informe o login e a senha');
      }

      if (!['F', 'C'].includes(tipo)) {
        throw new Error('Selecione entre cliente e funcionário');
      }

      let usuario: Funcionario | Cliente = null;

      switch (tipo) {
        case 'F':
          usuario = await funcionarioController.byLogin(login);
          break;
        case 'C':
          usuario = await clienteController.byLogin(login);
          break;
      }

      if (!usuario || !Crypt.compare(senha, usuario.senha)) {
        throw new Error('Login inválido');
      }

      delete usuario.senha;

      const usuarioJWT: UsuarioJWT = {
        id: usuario.id,
        nome: usuario.nome,
        tipo,
        funcionario: tipo === 'F' ? (usuario as Funcionario) : null,
        cliente: tipo === 'C' ? (usuario as Cliente) : null
      };

      const token = sign(usuarioJWT);

      res.status(200).json({ ...usuarioJWT, token });
    } catch (err) {
      res.status(404);
      next(err);
    }
  }
}