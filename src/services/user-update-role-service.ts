import { UserRole } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UsersRepositoryInterface } from '../repositories/interfaces/user-repository-interface';

export class UserUpdateRoleService {
  constructor(private readonly userRepository: UsersRepositoryInterface) {}

  async execute(residentId: string) {
    const existingResident = await this.userRepository.findById(residentId);

    if (!existingResident) {
      throw new ResourceNotFoundError('Usuário não encontrado.');
    }

    await this.userRepository.updateRole(
      residentId,
      existingResident?.role === UserRole.ADMIN
        ? UserRole.DWELLER
        : UserRole.ADMIN
    );

    return;
  }
}
