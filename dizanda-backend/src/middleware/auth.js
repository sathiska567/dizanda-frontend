import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from './errorHandler.js';

export function signToken(admin) {
  return jwt.sign({ sub: admin.id, email: admin.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new ApiError(401, 'Missing or invalid authorization header'));
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.admin = { id: payload.sub, email: payload.email };
    next();
  } catch {
    next(new ApiError(401, 'Session expired or invalid, please log in again'));
  }
}
