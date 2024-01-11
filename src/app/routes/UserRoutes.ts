import { FastifyInstance } from 'fastify';
import { authenticate } from '../controllers/authenticate';
import { saveExpense } from '../controllers/save-expense';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/auth', authenticate);

  app.post(
    '/save-expense',
    { preHandler: [verifyJWT, verifyUserRole('ADMIN')] },
    saveExpense
  );
};
