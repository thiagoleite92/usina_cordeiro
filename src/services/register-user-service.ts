import { EmailConflictError } from '../errors/EmailConflict';
import { UsersRepositoryInterface } from '../repositories/interfaces/user-repository-interface';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

export class RegisterUserService {
  constructor(private readonly userRepository: UsersRepositoryInterface) {}

  async execute(user: RegisterUserDto) {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      throw new EmailConflictError();
    }

    const hashedPassowrd = await bcrypt.hash(user.password, 8);

    user.password = hashedPassowrd;

    await this.userRepository.register(user);

    return;
  }
}
