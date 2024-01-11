import { PrismaExpenseRepository } from '../repositories/prisma-expense-repository';
import { saveExpenseDTO } from './dto/save-expense.dto';

interface SaveExpenseUseCaseRequest {
  expense: saveExpenseDTO;
}

// interface SaveExpenseUseCaseResponse {
//   user: User;
// }

export class SaveExpenseUseCase {
  constructor(private readonly expenseRepository: PrismaExpenseRepository) {}

  async execute({ expense }: SaveExpenseUseCaseRequest) {
    await this.expenseRepository.save(expense);
  }
}
