import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UsuarioJWT } from '../types/UsuarioJWT';

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (typeof token != 'string' || token.trim().length === 0) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }

  jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded: UsuarioJWT) => {
    if (!err) {
      req.user = decoded;

      return next();
    }

    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Login expirado' });
    }

    return res.status(401).json({ message: 'Falha na autentificação' });
  });
}