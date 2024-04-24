import { User } from '@prisma/client';
import { RegisterUserDto } from '../../services/dto/register-user.dto';

export interface UsersRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  register(user: RegisterUserDto): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateStatus(residentId: string, currentStatus: boolean): Promise<void>;
}
