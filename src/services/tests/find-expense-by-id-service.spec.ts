import { beforeEach, describe, expect, it } from 'vitest';
import { FindExpenseByIdService } from '../find-expense-by-id-service';
import { InMemoryExpenseRepository } from '../../repositories/in-memory/in-memory-expense-repository';
import { ExpenseRepositoryInterface } from '../../repositories/interfaces/expense-repository-interface';
import { createId } from '@paralleldrive/cuid2';
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError';

let expenseRepository: ExpenseRepositoryInterface;
let sut: FindExpenseByIdService;

describe('Service => Find Expense by Id', () => {
  beforeEach(() => {
    expenseRepository = new InMemoryExpenseRepository();
    sut = new FindExpenseByIdService(expenseRepository);
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

    const { expense, value, id: expenseId } = await sut.execute(id);

    expect(expense).toEqual(data.expense);
    expect(value.toNumber()).toEqual(data.value);
    expect(expenseId).toEqual(id);
  });

  it('should throw an error -> ResourceNotFound', async () => {
    await expect(() => sut.execute('randomId')).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
