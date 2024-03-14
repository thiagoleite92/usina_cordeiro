import { PrismaInstallmentRepository } from '../../repositories/prisma-installment-repository';
import { FindAllInstallmentsService } from '../find-all-installments-service';

export function makeFindAllInstallments() {
  const installmentRepository = new PrismaInstallmentRepository();

  const findAllInstallmentsService = new FindAllInstallmentsService(
    installmentRepository
  );

  return findAllInstallmentsService;
}
