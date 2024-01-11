import { PrismaExpenseRepository } from '../repositories/prisma-expense-repository';

type saveExpenseUseCaseRequest = {
  expense: string;
  value: number;
  description: string | null;
  date: string;
  userId: string;
};

export class SaveExpenseUseCase {
  constructor(private readonly expenseRepository: PrismaExpenseRepository) {}

  async execute(expense: saveExpenseUseCaseRequest) {
    expense.date = new Date(expense.date);

    await this.expenseRepository.save(expense);
  }
}
