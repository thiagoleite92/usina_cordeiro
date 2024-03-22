import { PrismaInstallmentCategoriesRepository } from '../../repositories/prisma-installment-categories-repository';
import { PrismaInstallmentRepository } from '../../repositories/prisma-installment-repository';
import { SaveInstallmentService } from '../save-installment-service';

export function makeSaveInstallmentService() {
  const prismaInstallmentCategoriesRepository =
    new PrismaInstallmentCategoriesRepository();
  const prismaInstallmentRepository = new PrismaInstallmentRepository();
  const saveInstallmentService = new SaveInstallmentService(
    prismaInstallmentRepository,
    prismaInstallmentCategoriesRepository
  );

  return saveInstallmentService;
}
