import { UsersRepositoryInterface } from '../repositories/interfaces/user-repository-interface';

export class GetAllUserServices {
  constructor(private readonly usersRepository: UsersRepositoryInterface) {}

  async execute() {
    const users = await this.usersRepository.getAllUsers();

    users.forEach((user) => delete user?.password);

    return users;
  }
}
