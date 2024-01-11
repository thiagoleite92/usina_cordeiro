import { Expense } from '@prisma/client';
import { saveExpenseDTO } from '../../use-cases/dto/save-expense.dto';

export interface ExpenseRepositoryInterface {
  save(expense: saveExpenseDTO): Promise<Expense>;
}
