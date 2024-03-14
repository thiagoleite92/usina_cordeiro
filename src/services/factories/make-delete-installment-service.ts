import { PrismaInstallmentRepository } from '../../repositories/prisma-installment-repository';
import { DeleteInstallmentService } from '../delete-installment-service';

export function makeDeleteInstallmentService() {
  const prismaInstallmentRepository = new PrismaInstallmentRepository();
  const deleteInstallmentService = new DeleteInstallmentService(
    prismaInstallmentRepository
  );

  return deleteInstallmentService;
}
