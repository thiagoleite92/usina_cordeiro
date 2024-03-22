import { Installment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { InstallmentRepositoryInterface } from '../repositories/interfaces/installment-repository-interface';
import { InstallmentCategoriesInterface } from '../repositories/interfaces/installment-categories-interface';

type updateInstallmentServiceRequest = {
  installmentCategoryId: string;
  value: number;
  description: string | null;
  date: string;
  userId: string;
  id: string;
};

export class UpdateInstallmentService {
  constructor(
    private readonly installmentRepository: InstallmentRepositoryInterface,
    private readonly installmentCategoriesRepository: InstallmentCategoriesInterface
  ) {}

  async execute(
    updateInstallment: updateInstallmentServiceRequest
  ): Promise<Installment | null> {
    const installment = await this.installmentRepository.findById(
      updateInstallment.id
    );

    if (!installment) {
      throw new ResourceNotFoundError('Recurso não encontrada');
    }

    const { id } = await this.installmentCategoriesRepository.findOrCreate(
      updateInstallment.installmentCategoryId
    );

    const update = {
      ...installment,
      ...updateInstallment,
      date: new Date(updateInstallment.date),
      installmentCategoryId: id,
    };

    const result = await this.installmentRepository.update(update);

    return result;
  }
}
