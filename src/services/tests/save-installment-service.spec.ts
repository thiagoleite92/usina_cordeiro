import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryInstallmentRepository } from '../../repositories/in-memory/in-memory-installment-repository';
import { createId } from '@paralleldrive/cuid2';
import { SaveInstallmentService } from '../save-installment-service';

let installmentRepository: InMemoryInstallmentRepository;
let sut: SaveInstallmentService;

describe('Service => Save Installment', () => {
  beforeEach(() => {
    installmentRepository = new InMemoryInstallmentRepository();
    sut = new SaveInstallmentService(installmentRepository);
  });

  it('should be able to save a installment', async () => {
    const installment = await sut.execute({
      date: '01/01/2023',
      description: '',
      installment: 'Serviço',
      userId: createId(),
      value: 19.99,
    });

    expect(installment).toBeDefined();
  });
});
