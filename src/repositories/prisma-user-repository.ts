import { UsersRepositoryInterface } from './interfaces/user-repository-interface';
import { prisma } from '../lib/prisma';

export class PrismaUsersRepository implements UsersRepositoryInterface {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }
}
