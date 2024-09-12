import { NextFunction, Request, Response } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  if (!req.user?.funcionario?.adm) {
    return res.status(401).json({ message: 'Conteúdo disponível apenas aos administradores do sistema' });
  }

  next();
}