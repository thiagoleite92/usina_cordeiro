import { PrismaInstallmentRepository } from '../../repositories/prisma-installment-repository';
import { UpdateInstallmentService } from '../update-installment-service';

export function makeUpdateInstallmentService() {
  const prismaInstallmentRepository = new PrismaInstallmentRepository();
  const updateInstallmentService = new UpdateInstallmentService(
    prismaInstallmentRepository
  );

  return updateInstallmentService;
}
