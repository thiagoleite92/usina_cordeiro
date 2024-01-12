import { SaveExpenseDTO } from '../../services/dto/save-expense.dto';
import { ExpenseRepositoryInterface } from '../interfaces/expense-repository-interface';
import { Expense } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';
import { Decimal } from '@prisma/client/runtime/library';
import { UpdateExpanseDTO } from '../../services/dto/update-expense.dto';

export class InMemoryExpenseRepository implements ExpenseRepositoryInterface {
  public items: Array<Expense> = [];

  async update({ id, date, description, expense, value }: UpdateExpanseDTO) {
    const foundExpense = this.items.find((item) => item.id === id);

    if (!foundExpense) {
      return null;
    }

    foundExpense.date = date ? date : foundExpense.date;
    foundExpense.description = description
      ? description
      : foundExpense.description;
    foundExpense.expense = expense ? expense : foundExpense.expense;
    foundExpense.value = value ? new Decimal(value) : foundExpense.value;

    return foundExpense;
  }

  async save(data: SaveExpenseDTO) {
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

  async findById(id: string) {
    const foundExpense = this.items.find((item) => item.id === id);

    return foundExpense ? foundExpense : null;
  }
}
