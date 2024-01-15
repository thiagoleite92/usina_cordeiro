import { PrismaExpenseRepository } from '../../repositories/prisma-expense-repository';
import { DeleteExpenseService } from '../delete-expense-service';

export function makeDeleteExpenseService() {
  const prismaExpenseRepository = new PrismaExpenseRepository();
  const deleteExpenseService = new DeleteExpenseService(
    prismaExpenseRepository
  );

  return deleteExpenseService;
}
