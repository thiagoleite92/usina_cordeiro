import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryInstallmentRepository } from '../../repositories/in-memory/in-memory-installment-repository';
import { InstallmentRepositoryInterface } from '../../repositories/interfaces/installment-repository-interface';
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError';
import { createId } from '@paralleldrive/cuid2';
import { DeleteInstallmentService } from '../delete-installment-service';

let installmentRepository: InstallmentRepositoryInterface;
let sut: DeleteInstallmentService;

describe('Service => delete installment by id', () => {
  beforeEach(() => {
    installmentRepository = new InMemoryInstallmentRepository();
    sut = new DeleteInstallmentService(installmentRepository);
  });

  it('should be able to return a installment if it exists', async () => {
    const data = {
      date: new Date('01/01/2023'),
      description: '',
      installment: 'Serviço',
      userId: createId(),
      value: 19.99,
    };

    const { id } = await installmentRepository.save(data);

    await sut.execute(id);

    const items = await installmentRepository.getItems();

    expect(items).toHaveLength(0);
  });

  it('should throw an error -> ResourceNotFound', async () => {
    await expect(() => sut.execute('randomId')).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
