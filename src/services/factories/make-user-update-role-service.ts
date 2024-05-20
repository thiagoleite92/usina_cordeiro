import { PrismaUsersRepository } from '../../repositories/prisma-user-repository';
import { UserUpdateRoleService } from '../user-update-role-service';

export const makeUserUpdateRoleService = () => {
  const userRepository = new PrismaUsersRepository();

  const userUpdateRoleService = new UserUpdateRoleService(userRepository);

  return userUpdateRoleService;
};
