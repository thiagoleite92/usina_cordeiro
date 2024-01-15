import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ExpenseRepositoryInterface } from '../repositories/interfaces/expense-repository-interface';

export class DeleteExpenseBy {
  constructor(private readonly expenseRepository: ExpenseRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const expense = await this.expenseRepository.findById(id);

    console.log(expense);

    if (!expense) {
      throw new ResourceNotFoundError('Despesa não encontrada');
    }

    await this.expenseRepository.delete(id);
  }
}
