import { Installment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { InstallmentRepositoryInterface } from '../repositories/interfaces/installment-repository-interface';

type updateInstallmentServiceRequest = {
  installment: string;
  value: number;
  description: string | null;
  date: Date;
  userId: string;
  id: string;
};

export class UpdateInstallmentService {
  constructor(
    private readonly installmentRepository: InstallmentRepositoryInterface
  ) {}

  async execute(
    updateInstallment: updateInstallmentServiceRequest
  ): Promise<Installment | null> {
    const installment = await this.installmentRepository.findById(
      updateInstallment.id
    );

    if (!installment) {
      throw new ResourceNotFoundError('Despesa não encontrada');
    }

    const update = {
      ...installment,
      ...updateInstallment,
      date: new Date(updateInstallment.date),
    };

    const result = await this.installmentRepository.update(update);

    return result;
  }
}
