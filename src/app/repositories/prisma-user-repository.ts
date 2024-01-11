import { UsersRepository } from './user-repository-interface';
import { prisma } from '../lib/prisma';

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }
}
