import { ExpenseRepositoryInterface } from './interfaces/expense-repository-interface';
import { saveExpenseDTO } from '../use-cases/dto/save-expense.dto';

import { prisma } from '../lib/prisma';
import { Expense } from '@prisma/client';

export class PrismaExpenseRepository implements ExpenseRepositoryInterface {
  async save(expense: saveExpenseDTO): Promise<Expense> {
    return await prisma.expense.create({ data: expense });
  }
}
