import { Expense } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ExpenseRepositoryInterface } from '../repositories/interfaces/expense-repository-interface';

export class FindExpenseByIdService {
  constructor(private readonly expenseRepository: ExpenseRepositoryInterface) {}

  async execute(id: string): Promise<Expense> {
    const expense = await this.expenseRepository.findById(id);

    if (!expense) {
      console.log('oi');
      throw new ResourceNotFoundError('Despesa não encontrada');
    }

    return expense;
  }
}
