import { PrismaUsersRepository } from '../../repositories/prisma-user-repository';
import { GetAllUserServices } from '../get-all-users-service';

export const makeGetAllUsersService = () => {
  const usersRepository = new PrismaUsersRepository();

  const getAllUserService = new GetAllUserServices(usersRepository);

  return getAllUserService;
};
