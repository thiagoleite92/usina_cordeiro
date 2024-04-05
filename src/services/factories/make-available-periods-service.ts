import { PrismaInstallmentRepository } from '../../repositories/prisma-installment-repository';
import { GetInstallmentPeriodsAvailable } from '../get-installment-period-available-service';

export const makeAvailablePeriodsService = () => {
  const installmentRepository = new PrismaInstallmentRepository();

  const getAvailablePeriodsService = new GetInstallmentPeriodsAvailable(
    installmentRepository
  );

  return getAvailablePeriodsService;
};
