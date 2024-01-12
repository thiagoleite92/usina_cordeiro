import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';
import { UsersRepositoryInterface } from '../repositories/interfaces/user-repository-interface';

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private readonly usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user?.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
