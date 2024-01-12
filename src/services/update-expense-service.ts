import { Expense } from '@prisma/client';
import { UpdateExpanseDTO } from './dto/update-expense.dto';
import { ExpenseRepositoryInterface } from '../repositories/interfaces/expense-repository-interface';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

export class UpdateExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepositoryInterface) {}

  async execute(updateExpense: UpdateExpanseDTO): Promise<Expense | null> {
    const expense = await this.expenseRepository.findById(updateExpense.id);

    if (!expense) {
      throw new ResourceNotFoundError('Despesa não encontrada');
    }

    const result = await this.expenseRepository.update(updateExpense);

    return result;
  }
}
