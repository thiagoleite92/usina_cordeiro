import { Installment } from '@prisma/client';
import { InstallmentRepositoryInterface } from '../repositories/interfaces/installment-repository-interface';

export type findAllInstallmentsRequest = {
  search?: string;
};

export class FindAllInstallmentsService {
  constructor(
    private readonly installmentsRepository: InstallmentRepositoryInterface
  ) {}

  async execute({
    search,
  }: findAllInstallmentsRequest): Promise<Installment[]> {
    const installments = await this.installmentsRepository.findAllInstallments({
      search,
    });

    return installments;
  }
}
