import { User } from '@prisma/client';
import { userRepository } from '../repositories/userRepository';

export const userService = {
  findUserByEmail: (email: string): Promise<User | null> => {
    return userRepository.findUserByEmail(email);
  },
};
