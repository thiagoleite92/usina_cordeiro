import { FastifyRequest } from 'fastify';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const verifyJWT = async (req: FastifyRequest) => {
  try {
    await req.jwtVerify();
  } catch (error) {
    throw new UnauthorizedError();
  }
};
