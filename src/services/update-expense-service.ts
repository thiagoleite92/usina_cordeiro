import { Expense } from '@prisma/client';
import { ExpenseRepositoryInterface } from '../repositories/interfaces/expense-repository-interface';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

type updateExpenseServiceRequest = {
  expense: string;
  value: number;
  description: string | null;
  date: string;
  userId: string;
  id: string;
};

export class UpdateExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepositoryInterface) {}

  async execute(
    updateExpense: updateExpenseServiceRequest
  ): Promise<Expense | null> {
    const expense = await this.expenseRepository.findById(updateExpense.id);

    if (!expense) {
      throw new ResourceNotFoundError('Despesa não encontrada');
    }

    const update = {
      ...expense,
      ...updateExpense,
      date: new Date(updateExpense.date),
    };

    const result = await this.expenseRepository.update(update);

    return result;
  }
}
