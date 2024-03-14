import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../middlewares/verify-jwt';
import { userSession } from '../controllers/user-session-controller';

export const userRoutes = async (app: FastifyInstance) => {
  app.get('/user/me', { preHandler: verifyJWT }, userSession);
};
