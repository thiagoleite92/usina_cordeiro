import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  findUserByEmail: (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
  },
};
