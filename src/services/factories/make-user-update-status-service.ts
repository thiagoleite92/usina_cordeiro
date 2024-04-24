import { PrismaUsersRepository } from '../../repositories/prisma-user-repository';
import { UserUpdateStatusService } from '../user-update-status-service';

export const makeUserUpdateStatusService = () => {
  const userRepository = new PrismaUsersRepository();

  const userUpdateStatusService = new UserUpdateStatusService(userRepository);

  return userUpdateStatusService;
};
