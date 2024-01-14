import { PrismaExpenseRepository } from '../../repositories/prisma-expense-repository';
import { FindExpenseByIdService } from '../find-expense-by-id-service';

export function makeFindExpenseByIdService() {
  const prismaExpenseRepository = new PrismaExpenseRepository();
  const findExpenseByIdService = new FindExpenseByIdService(
    prismaExpenseRepository
  );

  return findExpenseByIdService;
}
