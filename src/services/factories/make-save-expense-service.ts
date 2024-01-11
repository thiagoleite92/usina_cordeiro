import { PrismaExpenseRepository } from '../../repositories/prisma-expense-repository';
import { SaveExpenseService } from '../save-expense-service';

export function makeSaveExpenseService() {
  const prismaExpenseRepository = new PrismaExpenseRepository();
  const saveExpenseService = new SaveExpenseService(prismaExpenseRepository);

  return saveExpenseService;
}
