import { InstallmentCategoriesInterface } from '../repositories/interfaces/installment-categories-interface';

export class GetInstallmentCategoriesService {
  constructor(
    private readonly installmentCategoriesRepository: InstallmentCategoriesInterface
  ) {}

  async execute() {
    const installmentCategories =
      await this.installmentCategoriesRepository.getAllCategories();

    return installmentCategories;
  }
}
