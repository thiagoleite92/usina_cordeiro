import { FastifyInstance } from 'fastify';
import { authenticate } from '../controllers/authenticate';

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/auth', authenticate);
};
