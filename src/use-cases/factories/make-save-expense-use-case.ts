import { PrismaExpenseRepository } from '../../repositories/prisma-expense-repository';
import { SaveExpenseUseCase } from '../save-expense-use-case';

export function makeSaveExpenseUseCase() {
  const prismaExpenseRepository = new PrismaExpenseRepository();
  const saveExpenseUseCase = new SaveExpenseUseCase(prismaExpenseRepository);

  return saveExpenseUseCase;
}
