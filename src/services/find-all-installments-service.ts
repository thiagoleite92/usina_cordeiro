import { Installment } from '@prisma/client';
import { InstallmentRepositoryInterface } from '../repositories/interfaces/installment-repository-interface';

export type findAllInstallmentsRequest = {
  perPage?: number;
  page?: number;
  monthFilter?: string[];
};

export class FindAllInstallmentsService {
  constructor(
    private readonly installmentsRepository: InstallmentRepositoryInterface
  ) {}

  async execute({
    perPage,
    page,
    monthFilter,
  }: findAllInstallmentsRequest): Promise<Installment[]> {
    const installments = await this.installmentsRepository.findAllInstallments({
      perPage,
      page,
      monthFilter,
    });

    return installments;
  }
}
