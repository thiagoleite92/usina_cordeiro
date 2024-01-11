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

  async execute(expense: saveExpenseServiceRequest) {
    expense.date = new Date(expense.date);

    await this.expenseRepository.save(expense);
  }
}
