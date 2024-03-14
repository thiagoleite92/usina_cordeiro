import { beforeEach, describe, expect, it } from 'vitest';
import { FindUserByIdService } from '../find-user-by-id-service';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository';
import { createId } from '@paralleldrive/cuid2';
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

let userRepository: InMemoryUserRepository;
let sut: FindUserByIdService;

describe('Service => Find User by Id', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new FindUserByIdService(userRepository);
  });

  it('should be able to return a user if it exists', async () => {
    const id = createId();

    const createUser = {
      name: 'Administrador da Silva',
      email: 'admin@admin.com',
      password: await bcrypt.hash('Senha@123', 6),
      role: UserRole.ADMIN,
      id,
    };

    userRepository.items.push(createUser);

    const user = await sut.execute(id);

    expect(user.id).toEqual(id);
  });

  it('should throw an error -> ResourceNotFound', async () => {
    await expect(() => sut.execute('randomId')).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
