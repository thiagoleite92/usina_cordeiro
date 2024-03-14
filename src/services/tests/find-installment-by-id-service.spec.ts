import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryInstallmentRepository } from '../../repositories/in-memory/in-memory-installment-repository';
import { InstallmentRepositoryInterface } from '../../repositories/interfaces/installment-repository-interface';
import { createId } from '@paralleldrive/cuid2';
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError';
import { FindInstallmentByIdService } from '../find-installment-by-id-service';

let installmentRepository: InstallmentRepositoryInterface;
let sut: FindInstallmentByIdService;

describe('Service => Find Installment by Id', () => {
  beforeEach(() => {
    installmentRepository = new InMemoryInstallmentRepository();
    sut = new FindInstallmentByIdService(installmentRepository);
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

    const { installment, value, id: installmentId } = await sut.execute(id);

    expect(installment).toEqual(data.installment);
    expect(value.toNumber()).toEqual(data.value);
    expect(installmentId).toEqual(id);
  });

  it('should throw an error -> ResourceNotFound', async () => {
    await expect(() => sut.execute('randomId')).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
