import { PrismaInstallmentCategoriesRepository } from '../../repositories/prisma-installment-categories-repository';
import { GetInstallmentCategoriesService } from '../get-installment-categories-service';

export const makeGetInstallmentCategoriesService = () => {
  const installmentCategoriesRepository =
    new PrismaInstallmentCategoriesRepository();

  const getInstallmentCategoriesService = new GetInstallmentCategoriesService(
    installmentCategoriesRepository
  );

  return getInstallmentCategoriesService;
};
