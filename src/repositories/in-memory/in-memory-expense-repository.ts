import { saveExpenseDTO } from '../../services/dto/save-expense.dto';
import { ExpenseRepositoryInterface } from '../interfaces/expense-repository-interface';
import { Expense } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';
import { Decimal } from '@prisma/client/runtime/library';

export class InMemoryExpenseRepository implements ExpenseRepositoryInterface {
  public items: Array<Expense> = [];

  async save(data: saveExpenseDTO): Promise<Expense> {
    const expense: Expense = {
      id: createId(),
      expense: data.expense,
      date: data.date,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
      value: new Decimal(data.value),
    };

    this.items.push(expense);

    return expense;
  }
}
