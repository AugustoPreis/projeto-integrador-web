import jwt from 'jsonwebtoken';
import { UsuarioJWT } from '../types/UsuarioJWT';

function sign(values: UsuarioJWT) {
  const nValues = { ...values };

  const token = jwt.sign({
    ...nValues,
  }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
}

export { sign };