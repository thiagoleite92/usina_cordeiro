import { FastifyInstance } from 'fastify';
import { saveExpense } from '../controllers/save-expense-controller';
import { verifyJWT } from '../middlewares/verify-jwt';
import { verifyUserRole } from '../middlewares/verify-user-role';
import { updateExpense } from '../controllers/update-expense-controller';

export const expenseRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', verifyJWT);
  app.addHook('preHandler', verifyUserRole('ADMIN'));

  app.post('/save-expense', saveExpense);
  app.post('/update-expense', updateExpense);
};
