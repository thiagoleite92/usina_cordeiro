import { FastifyInstance } from 'fastify';
import { saveExpense } from '../controllers/save-expense-controller';
import { authenticate } from '../controllers/authenticate-controller';
import { verifyJWT } from '../middlewares/verify-jwt';
import { verifyUserRole } from '../middlewares/verify-user-role';

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/auth', authenticate);

  app.addHook('preHandler', verifyJWT);
  app.addHook('preHandler', verifyUserRole('ADMIN'));

  app.post(
    '/save-expense',

    saveExpense
  );

  // app.post(
  //   '/save-expense',
  //   { preHandler: [verifyJWT, verifyUserRole('ADMIN')] },
  //   updateExpense
  // );
};
