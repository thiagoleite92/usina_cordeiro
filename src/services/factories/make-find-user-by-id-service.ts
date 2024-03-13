import { PrismaUsersRepository } from '../../repositories/prisma-user-repository';
import { FindUserByIdService } from '../find-user-by-id-service';

export function makeFindUserByIdService() {
  const prismaUserRepository = new PrismaUsersRepository();
  const findUserByIdService = new FindUserByIdService(prismaUserRepository);

  return findUserByIdService;
}
