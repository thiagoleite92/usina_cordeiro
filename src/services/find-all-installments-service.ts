import { Installment } from '@prisma/client';
import { InstallmentRepositoryInterface } from '../repositories/interfaces/installment-repository-interface';

export type findAllInstallmentsRequest = {
  search?: string;
  perPage?: number;
  page?: number;
};

export class FindAllInstallmentsService {
  constructor(
    private readonly installmentsRepository: InstallmentRepositoryInterface
  ) {}

  async execute({
    search,
    perPage,
    page,
  }: findAllInstallmentsRequest): Promise<Installment[]> {
    const installments = await this.installmentsRepository.findAllInstallments({
      search,
      perPage,
      page,
    });

    return installments;
  }
}
