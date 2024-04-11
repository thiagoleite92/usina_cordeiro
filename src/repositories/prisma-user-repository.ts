import { UsersRepositoryInterface } from './interfaces/user-repository-interface';
import { prisma } from '../lib/prisma';
import { RegisterUserDto } from '../services/dto/register-user.dto';

export class PrismaUsersRepository implements UsersRepositoryInterface {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }

  async register(user: RegisterUserDto) {
    return await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
        residence: [user.residence.bloco, user.residence.apto],
      },
    });
  }
}
