import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryExpenseRepository } from '../../repositories/in-memory/in-memory-expense-repository';
import { UpdateExpenseService } from '../update-expense-service';
import { createId } from '@paralleldrive/cuid2';
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError';

let expenseRepository: InMemoryExpenseRepository;
let sut: UpdateExpenseService;

describe('Service => Update Expense', () => {
  beforeEach(() => {
    expenseRepository = new InMemoryExpenseRepository();
    sut = new UpdateExpenseService(expenseRepository);
  });

  it('should be able to update an expense', async () => {
    const data = {
      date: new Date('01/01/2023'),
      description: '',
      expense: 'Serviço',
      userId: createId(),
      value: 19.99,
    };

    const newData = {
      date: new Date('01/01/2023'),
      description: 'atualizado',
      expense: 'Despesa',
      userId: createId(),
      value: 12.99,
      updatedAt: new Date('02/01/2023'),
    };

    const { id } = await expenseRepository.save(data);

    const result = await sut.execute({
      ...newData,
      id,
    });

    expect(result?.description).toEqual(newData.description);
    expect(result?.expense).toEqual(newData.expense);
    expect(result?.value.toNumber()).toEqual(newData.value);
  });

  it('should not be able to update an expense that was not found', async () => {
    const data = {
      date: new Date('01/01/2023'),
      description: '',
      expense: 'Serviço',
      userId: createId(),
      value: 19.99,
    };

    const newData = {
      date: new Date('01/01/2023'),
      description: 'atualizado',
      expense: 'Despesa',
      userId: createId(),
      value: 12.99,
      updatedAt: new Date('02/01/2023'),
    };

    await expenseRepository.save(data);

    await expect(() =>
      sut.execute({
        ...newData,
        id: createId(),
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
