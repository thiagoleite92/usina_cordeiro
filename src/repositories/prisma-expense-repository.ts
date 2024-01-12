import { ExpenseRepositoryInterface } from './interfaces/expense-repository-interface';

import { prisma } from '../lib/prisma';
import { SaveExpenseDTO } from '../services/dto/save-expense.dto';
import { UpdateExpanseDTO } from '../services/dto/update-expense.dto';

export class PrismaExpenseRepository implements ExpenseRepositoryInterface {
  async update(expense: UpdateExpanseDTO) {
    return await prisma.expense.update({
      where: { id: expense.id },
      data: expense,
    });
  }

  async save(expense: SaveExpenseDTO) {
    return await prisma.expense.create({ data: expense });
  }
  async findById(id: string) {
    return await prisma.expense.findUnique({ where: { id } });
  }
}
