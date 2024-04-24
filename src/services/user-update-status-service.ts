import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UsersRepositoryInterface } from '../repositories/interfaces/user-repository-interface';

export class UserUpdateStatusService {
  constructor(private readonly userRepository: UsersRepositoryInterface) {}

  async execute(residentId: string) {
    const existingResident = await this.userRepository.findById(residentId);

    if (!existingResident) {
      throw new ResourceNotFoundError('Usuário não encontrado.');
    }

    await this.userRepository.updateStatus(
      residentId,
      existingResident?.isActive
    );

    return;
  }
}
