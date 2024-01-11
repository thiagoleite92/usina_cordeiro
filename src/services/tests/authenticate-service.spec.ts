import { expect, it, describe, beforeEach, afterEach } from 'vitest';
import * as bcrypt from 'bcrypt';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user-repository';
import { AuthenticateService } from '../authenticate-service';
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError';

let userRepository: InMemoryUserRepository;
let sut: AuthenticateService;

describe('Service => Authenticate', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateService(userRepository);
    userRepository.items.push({
      name: 'Administrador da Silva',
      email: 'admin@admin.com',
      password: await bcrypt.hash('Senha@123', 6),
      role: 'ADMIN',
      id: 'admin-id',
    });
  });

  afterEach(async () => {
    userRepository.items = [];
  });

  it('should be able to authenticate', async () => {
    const { user } = await sut.execute({
      email: 'admin@admin.com',
      password: 'Senha@123',
    });

    expect(user).toBeDefined();
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrong@email.com',
        password: 'Senha@123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'admin@admin.com',
        password: 'WrongPassword',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
