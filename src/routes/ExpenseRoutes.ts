import { FastifyInstance } from 'fastify';
import { saveExpense } from '../controllers/save-expense-controller';
import { verifyJWT } from '../middlewares/verify-jwt';
import { verifyUserRole } from '../middlewares/verify-user-role';
import { updateExpense } from '../controllers/update-expense-controller';
import { getExpenseById } from '../controllers/get-expense-by-id-controller';

export const expenseRoutes = async (app: FastifyInstance) => {
  app.get('/expense/:expenseId', { preHandler: verifyJWT }, getExpenseById);

  app.post(
    '/expense',
    { preHandler: [verifyJWT, verifyUserRole('ADMIN')] },
    saveExpense
  );
  app.put(
    '/expense',
    { preHandler: [verifyJWT, verifyUserRole('ADMIN')] },
    updateExpense
  );
};
