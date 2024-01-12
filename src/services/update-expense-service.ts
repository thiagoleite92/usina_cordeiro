import { Expense } from '@prisma/client';
import { PrismaExpenseRepository } from '../repositories/prisma-expense-repository';
import { UpdateExpanseDTO } from './dto/update-expense.dto';

export class UpdateExpenseService {
  constructor(private readonly expenseRepository: PrismaExpenseRepository) {}

  async execute(updateExpense: UpdateExpanseDTO): Promise<Expense | null> {
    //to do findexpense by id

    const result = await this.expenseRepository.update(updateExpense);

    return result;
  }
}
