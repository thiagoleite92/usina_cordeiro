import { InstallmentRepositoryInterface } from '../repositories/interfaces/installment-repository-interface';

export class GetInstallmentPeriodsAvailable {
  constructor(
    private readonly installmentRepository: InstallmentRepositoryInterface
  ) {}

  async execute() {
    const availablePeriods =
      await this.installmentRepository.getAvailablePeriods();

    return availablePeriods;
  }
}
