import { Installment, InstallmentEnum } from '@prisma/client';
import { InstallmentRepositoryInterface } from '../repositories/interfaces/installment-repository-interface';

type saveInstallmentServiceRequest = {
  installment: string;
  value: number;
  description: string | null;
  date: string;
  userId: string;
  type: InstallmentEnum;
};

export class SaveInstallmentService {
  constructor(
    private readonly installmentRepository: InstallmentRepositoryInterface
  ) {}

  async execute(
    installment: saveInstallmentServiceRequest
  ): Promise<Installment> {
    const data = {
      ...installment,
      date: new Date(installment.date),
    };

    const result = await this.installmentRepository.save(data);

    return result;
  }
}
