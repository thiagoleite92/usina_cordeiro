import { FastifyInstance } from 'fastify';
import { saveInstallment } from '../controllers/save-installment-controller';
import { verifyJWT } from '../middlewares/verify-jwt';
import { verifyUserRole } from '../middlewares/verify-user-role';
import { updateInstallment } from '../controllers/update-installment-controller';
import { getInstallmentById } from '../controllers/get-installment-by-id-controller';
import { deleteInstallment } from '../controllers/delete-installment-controller';
import { findAllInstallments } from '../controllers/find-all-installments-controller';
import { getInstallmentCategories } from '../controllers/get-installment-categories-controller';
import { getInstallmentPeriodsAvailable } from '../controllers/get-installment-period-available-controller';

export const installmentRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT);

  app.get('/installment', findAllInstallments);
  app.get('/installment/periods-available', getInstallmentPeriodsAvailable);
  app.get('/installment/categories', getInstallmentCategories);

  app.get(
    '/installment/:installmentId',
    { preHandler: verifyUserRole('ADMIN') },
    getInstallmentById
  );
  app.post(
    '/installment',
    { preHandler: verifyUserRole('ADMIN') },
    saveInstallment
  );
  app.put(
    '/installment/:installmentId',
    { preHandler: verifyUserRole('ADMIN') },
    updateInstallment
  );
  app.delete(
    '/installment/:installmentId',
    { preHandler: verifyUserRole('ADMIN') },
    deleteInstallment
  );
};
