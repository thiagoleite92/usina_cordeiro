import { SaveExpenseDTO } from './save-expense.dto';

export type UpdateExpanseDTO = Partial<SaveExpenseDTO> & { id: string };
