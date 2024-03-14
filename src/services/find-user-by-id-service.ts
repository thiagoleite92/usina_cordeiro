import { User } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UsersRepositoryInterface } from '../repositories/interfaces/user-repository-interface';

export class FindUserByIdService {
  constructor(private readonly userRepository: UsersRepositoryInterface) {}

  async execute(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError('Usuário não encontrado');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    return { ...rest };
  }
}
