import { PrismaInstallmentCategoriesRepository } from '../../repositories/prisma-installment-categories-repository';
import { PrismaInstallmentRepository } from '../../repositories/prisma-installment-repository';
import { UpdateInstallmentService } from '../update-installment-service';

export function makeUpdateInstallmentService() {
  const prismaInstallmentCategoriesRepository =
    new PrismaInstallmentCategoriesRepository();
  const prismaInstallmentRepository = new PrismaInstallmentRepository();
  const updateInstallmentService = new UpdateInstallmentService(
    prismaInstallmentRepository,
    prismaInstallmentCategoriesRepository
  );

  return updateInstallmentService;
}
