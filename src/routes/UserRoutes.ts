import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../middlewares/verify-jwt';
import { userSession } from '../controllers/user-session-controller';
import { registerUser } from '../controllers/register-user-controller';

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/user', registerUser);
  app.get('/user/me', { preHandler: verifyJWT }, userSession);
};
