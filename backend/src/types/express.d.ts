import { UsuarioJWT } from './UsuarioJWT';

declare global {
  namespace Express {
    export interface Request {
      user?: UsuarioJWT;
    }
  }
}