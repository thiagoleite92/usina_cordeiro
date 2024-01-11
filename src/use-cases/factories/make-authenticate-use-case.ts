import { PrismaUsersRepository } from '../../repositories/prisma-user-repository';
import { AuthenticateUseCase } from '../authenticate-use-case';

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

  return authenticateUseCase;
}
