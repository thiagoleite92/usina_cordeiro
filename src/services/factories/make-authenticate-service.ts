import { PrismaUsersRepository } from '../../repositories/prisma-user-repository';
import { AuthenticateService } from '../authenticate-service';

export function makeAuthenticateService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(prismaUsersRepository);

  return authenticateService;
}
