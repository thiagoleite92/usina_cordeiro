import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ExpenseRepositoryInterface } from '../repositories/interfaces/expense-repository-interface';

export class DeleteExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const expense = await this.expenseRepository.findById(id);

    if (!expense) {
      throw new ResourceNotFoundError('Despesa não encontrada');
    }

    await this.expenseRepository.delete(id);
  }
}
