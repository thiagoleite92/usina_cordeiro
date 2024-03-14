import { PrismaInstallmentRepository } from '../../repositories/prisma-installment-repository';
import { FindInstallmentByIdService } from '../find-installment-by-id-service';

export function makeFindInstallmentByIdService() {
  const prismaInstallmentRepository = new PrismaInstallmentRepository();
  const findInstallmentByIdService = new FindInstallmentByIdService(
    prismaInstallmentRepository
  );

  return findInstallmentByIdService;
}
