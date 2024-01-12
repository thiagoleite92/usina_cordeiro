import { Expense } from '@prisma/client';
import { saveExpenseDTO } from '../../services/dto/save-expense.dto';

export interface ExpenseRepositoryInterface {
  save(expense: saveExpenseDTO): Promise<Expense>;
}
