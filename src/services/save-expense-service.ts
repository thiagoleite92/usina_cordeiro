import { Expense } from '@prisma/client';
import { PrismaExpenseRepository } from '../repositories/prisma-expense-repository';

type saveExpenseServiceRequest = {
  expense: string;
  value: number;
  description: string | null;
  date: string;
  userId: string;
};

export class SaveExpenseService {
  constructor(private readonly expenseRepository: PrismaExpenseRepository) {}

  async execute(expense: saveExpenseServiceRequest): Promise<Expense> {
    expense.date = new Date(expense.date).toISOString();

    const result = await this.expenseRepository.save(expense);

    return result;
  }
}
