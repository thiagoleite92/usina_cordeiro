import { FastifyInstance } from 'fastify';
import { authenticate } from '../controllers/authenticate-controller';

export const authRoute = async (app: FastifyInstance) => {
  app.post('/auth', authenticate);
};
