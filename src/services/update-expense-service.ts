import { Expense } from '@prisma/client';
import { UpdateExpanseDTO } from './dto/update-expense.dto';
import { ExpenseRepositoryInterface } from '../repositories/interfaces/expense-repository-interface';

export class UpdateExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepositoryInterface) {}

  async execute(updateExpense: UpdateExpanseDTO): Promise<Expense | null> {
    //to do findexpense by id

    const result = await this.expenseRepository.update(updateExpense);

    return result;
  }
}
