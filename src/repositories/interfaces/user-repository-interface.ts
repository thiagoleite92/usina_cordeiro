import { User } from '@prisma/client';

export interface UsersRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
