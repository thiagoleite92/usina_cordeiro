import { UsersRepositoryInterface } from './interfaces/user-repository-interface';
import { prisma } from '../lib/prisma';
import { RegisterUserDto } from '../services/dto/register-user.dto';
import { $Enums } from '@prisma/client';

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

  async getAllUsers() {
    return await prisma.user.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async updateStatus(residentId: string, currentStatus: boolean) {
    await prisma.user.update({
      where: { id: residentId },
      data: { isActive: !currentStatus },
    });
  }

  async updateRole(residentId: string, newRole: $Enums.UserRole) {
    await prisma.user.update({
      where: { id: residentId },
      data: { role: newRole },
    });
  }
}
