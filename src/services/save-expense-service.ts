import { Expense } from '@prisma/client';
import { ExpenseRepositoryInterface } from '../repositories/interfaces/expense-repository-interface';

type saveExpenseServiceRequest = {
  expense: string;
  value: number;
  description: string | null;
  date: string;
  userId: string;
};

export class SaveExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepositoryInterface) {}

  async execute(expense: saveExpenseServiceRequest): Promise<Expense> {
    const data = {
      ...expense,
      date: new Date(expense.date),
    };

    const result = await this.expenseRepository.save(data);

    return result;
  }
}
