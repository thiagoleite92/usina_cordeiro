import { Expense } from '@prisma/client';
import { SaveExpenseDTO } from '../../services/dto/save-expense.dto';
import { UpdateExpanseDTO } from '../../services/dto/update-expense.dto';

export interface ExpenseRepositoryInterface {
  save(expense: SaveExpenseDTO): Promise<Expense>;
  update(expense: UpdateExpanseDTO): Promise<Expense | null>;
}
