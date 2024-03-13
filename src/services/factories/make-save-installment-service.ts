import { PrismaInstallmentRepository } from '../../repositories/prisma-installment-repository';
import { SaveInstallmentService } from '../save-installment-service';

export function makeSaveInstallmentService() {
  const prismaInstallmentRepository = new PrismaInstallmentRepository();
  const saveInstallmentService = new SaveInstallmentService(
    prismaInstallmentRepository
  );

  return saveInstallmentService;
}
