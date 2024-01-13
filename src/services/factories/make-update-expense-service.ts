import { PrismaExpenseRepository } from '../../repositories/prisma-expense-repository';
import { UpdateExpenseService } from '../update-expense-service';

export function makeUpdateExpenseService() {
  const prismaExpenseRepository = new PrismaExpenseRepository();
  const updateExpenseService = new UpdateExpenseService(
    prismaExpenseRepository
  );

  return updateExpenseService;
}
