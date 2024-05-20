import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryInstallmentRepository } from '../../repositories/in-memory/in-memory-installment-repository';
import { createId } from '@paralleldrive/cuid2';
import { SaveInstallmentService } from '../save-installment-service';
import { InMemoryInstallmentCategoriesRepository } from '../../repositories/in-memory/in-memory-installment-category-repository';

let installmentRepository: InMemoryInstallmentRepository;
let installmentCategoriesRepository: InMemoryInstallmentCategoriesRepository;
let sut: SaveInstallmentService;

describe('Service => Save Installment', () => {
  beforeEach(() => {
    installmentRepository = new InMemoryInstallmentRepository();
    installmentCategoriesRepository =
      new InMemoryInstallmentCategoriesRepository();
    sut = new SaveInstallmentService(
      installmentRepository,
      installmentCategoriesRepository
    );
  });

  it('should be able to save a installment', async () => {
    const installment = await sut.execute({
      date: '01/01/2023',
      description: '',
      installmentCategoryId: 'Serviço',
      userId: createId(),
      value: 19.99,
      type: 'INCOME',
    });

    expect(installment).toBeDefined();
  });
});
