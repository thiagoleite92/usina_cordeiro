import { User } from '@prisma/client';
import { UsersRepositoryInterface } from '../interfaces/user-repository-interface';

export class InMemoryUserRepository implements UsersRepositoryInterface {
  public items: Array<User> = [];

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
