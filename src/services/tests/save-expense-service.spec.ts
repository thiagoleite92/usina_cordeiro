import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryExpenseRepository } from '../../repositories/in-memory/in-memory-expense-repository';
import { SaveExpenseService } from '../save-expense-service';
import { createId } from '@paralleldrive/cuid2';

let expenseRepository: InMemoryExpenseRepository;
let sut: SaveExpenseService;

describe('Service => Save Expense', () => {
  beforeEach(() => {
    expenseRepository = new InMemoryExpenseRepository();
    sut = new SaveExpenseService(expenseRepository);
  });

  it('should be able to save a expense', async () => {
    const expense = await sut.execute({
      date: '01/01/2023',
      description: '',
      expense: 'Serviço',
      userId: createId(),
      value: 19.99,
    });

    expect(expense).toBeDefined();
  });
});
