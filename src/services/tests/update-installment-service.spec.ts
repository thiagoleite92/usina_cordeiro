import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryInstallmentRepository } from '../../repositories/in-memory/in-memory-installment-repository';
import { createId } from '@paralleldrive/cuid2';
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError';
import { UpdateInstallmentService } from '../update-installment-service';
import { InstallmentEnum } from '@prisma/client';
import { InMemoryInstallmentCategoriesRepository } from '../../repositories/in-memory/in-memory-installment-category-repository';

let installmentRepository: InMemoryInstallmentRepository;
let installmentCategoriesRepository: InMemoryInstallmentCategoriesRepository;
let sut: UpdateInstallmentService;

describe('Service => Update Installment', () => {
  beforeEach(() => {
    installmentRepository = new InMemoryInstallmentRepository();
    installmentCategoriesRepository =
      new InMemoryInstallmentCategoriesRepository();
    sut = new UpdateInstallmentService(
      installmentRepository,
      installmentCategoriesRepository
    );
  });

  it('should be able to update an installment', async () => {
    const data = {
      date: new Date('01/01/2023'),
      description: '',
      installmentCategoryId: 'Serviço',
      userId: createId(),
      value: 19.99,
      type: InstallmentEnum.INCOME,
    };

    const newData = {
      date: new Date('01/01/2023'),
      description: 'atualizado',
      installmentCategoryId: 'Despesa',
      userId: createId(),
      value: 12.99,
      type: InstallmentEnum.INCOME,
      updatedAt: new Date('02/01/2023'),
    };

    const { id } = await installmentRepository.save(data);

    const result = await sut.execute({
      ...newData,
      id,
    });

    expect(result?.description).toEqual(newData.description);
    expect(result?.value).toEqual(newData.value);
  });

  it('should not be able to update an installment that was not found', async () => {
    const data = {
      date: new Date('01/01/2023'),
      description: '',
      installmentCategoryId: 'Serviço',
      userId: createId(),
      value: 19.99,
      type: InstallmentEnum.OUTCOME,
    };

    const newData = {
      date: new Date('01/01/2023'),
      description: 'atualizado',
      installmentCategoryId: 'Despesa',
      userId: createId(),
      value: 12.99,
      type: InstallmentEnum.OUTCOME,
      updatedAt: new Date('02/01/2023'),
    };

    await installmentRepository.save(data);

    await expect(() =>
      sut.execute({
        ...newData,
        id: createId(),
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
