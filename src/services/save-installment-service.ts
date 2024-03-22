import { Installment, InstallmentEnum } from '@prisma/client';
import { InstallmentRepositoryInterface } from '../repositories/interfaces/installment-repository-interface';
import { InstallmentCategoriesInterface } from '../repositories/interfaces/installment-categories-interface';

type saveInstallmentServiceRequest = {
  installmentCategoryId: string;
  value: number;
  description: string | null;
  date: string;
  userId: string;
  type: InstallmentEnum;
};

export class SaveInstallmentService {
  constructor(
    private readonly installmentRepository: InstallmentRepositoryInterface,
    private readonly instalmmentCategoriesRepository: InstallmentCategoriesInterface
  ) {}

  async execute(
    installment: saveInstallmentServiceRequest
  ): Promise<Installment> {
    const { id } = await this.instalmmentCategoriesRepository.findOrCreate(
      installment.installmentCategoryId
    );

    installment.installmentCategoryId = id;

    const data = {
      ...installment,
      date: new Date(installment.date),
    };

    const result = await this.installmentRepository.save(data);

    return result;
  }
}
