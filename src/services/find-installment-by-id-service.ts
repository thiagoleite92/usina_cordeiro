import { Installment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { InstallmentRepositoryInterface } from '../repositories/interfaces/installment-repository-interface';

export class FindInstallmentByIdService {
  constructor(
    private readonly installmentRepository: InstallmentRepositoryInterface
  ) {}

  async execute(id: string): Promise<Installment> {
    const installment = await this.installmentRepository.findById(id);

    if (!installment) {
      console.log('oi');
      throw new ResourceNotFoundError('Despesa não encontrada');
    }

    return installment;
  }
}
