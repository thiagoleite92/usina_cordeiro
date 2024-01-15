import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryExpenseRepository } from '../../repositories/in-memory/in-memory-expense-repository';
import { DeleteExpenseService } from '../delete-expense-service';
import { ExpenseRepositoryInterface } from '../../repositories/interfaces/expense-repository-interface';
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError';
import { createId } from '@paralleldrive/cuid2';

let expenseRepository: ExpenseRepositoryInterface;
let sut: DeleteExpenseService;

describe('Service => delete expense by id', () => {
  beforeEach(() => {
    expenseRepository = new InMemoryExpenseRepository();
    sut = new DeleteExpenseService(expenseRepository);
  });

  it('should be able to return a expense if it exists', async () => {
    const data = {
      date: new Date('01/01/2023'),
      description: '',
      expense: 'Serviço',
      userId: createId(),
      value: 19.99,
    };

    const { id } = await expenseRepository.save(data);

    await sut.execute(id);

    const items = await expenseRepository.getItems();

    expect(items).toHaveLength(0);
  });

  it('should throw an error -> ResourceNotFound', async () => {
    await expect(() => sut.execute('randomId')).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
