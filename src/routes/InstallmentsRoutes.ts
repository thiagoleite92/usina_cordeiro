import { FastifyInstance } from 'fastify';
import { saveInstallment } from '../controllers/save-installment-controller';
import { verifyJWT } from '../middlewares/verify-jwt';
import { verifyUserRole } from '../middlewares/verify-user-role';
import { updateInstallment } from '../controllers/update-installment-controller';
import { getInstallmentById } from '../controllers/get-installment-by-id-controller';
import { deleteInstallment } from '../controllers/delete-installment-controller';
import { findAllInstallments } from '../controllers/find-all-installments-controller';

export const installmentRoutes = async (app: FastifyInstance) => {
  app.get('/installment', { preHandler: verifyJWT }, findAllInstallments);

  app.get(
    '/installment/:installmentId',
    { preHandler: verifyJWT },
    getInstallmentById
  );

  app.post(
    '/installment',
    { preHandler: [verifyJWT, verifyUserRole('ADMIN')] },
    saveInstallment
  );
  app.put(
    '/installment',
    { preHandler: [verifyJWT, verifyUserRole('ADMIN')] },
    updateInstallment
  );

  app.delete(
    '/installment/:installmentId',
    { preHandler: [verifyJWT, verifyUserRole('ADMIN')] },
    deleteInstallment
  );
};
