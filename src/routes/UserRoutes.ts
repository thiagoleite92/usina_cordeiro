import { FastifyInstance } from 'fastify';
import { saveExpense } from '../controllers/save-expense-controller';
import { verifyJWT } from '../middlewares/verify-jwt';
import { verifyUserRole } from '../middlewares/verify-user-role';

export const userRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', verifyJWT);
  app.addHook('preHandler', verifyUserRole('ADMIN'));

  app.post('/save-expense', saveExpense);
};
