import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { InstallmentRepositoryInterface } from '../repositories/interfaces/installment-repository-interface';

export class DeleteInstallmentService {
  constructor(
    private readonly installmentRepository: InstallmentRepositoryInterface
  ) {}

  async execute(id: string): Promise<void> {
    const installment = await this.installmentRepository.findById(id);

    if (!installment) {
      throw new ResourceNotFoundError('Despesa não encontrada');
    }

    await this.installmentRepository.delete(id);
  }
}
