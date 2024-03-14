import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';
import request from 'supertest';
import * as bcrypt from 'bcrypt';

import { app } from '../../app/app';
import { prisma } from '../../lib/prisma';

describe('e2e => authenticate', () => {
  let userId;

  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(async () => {
    const { id } = await prisma.user.create({
      data: {
        email: 'teste@teste.com',
        password: await bcrypt.hash('Senha@123', 6),
        name: 'Thiago Leite',
        role: 'ADMIN',
      },
    });
    userId = id;
  });

  afterEach(async () => {
    await prisma.user.delete({ where: { id: userId! } });
  });

  afterAll(async () => {
    await app.close();
  });

  it('[GET] /api/user/me should authenticate', async () => {
    const authResponse = await request(app.server)
      .post('/api/auth')
      .send({ email: 'teste@teste.com', password: 'Senha@123' });

    const response = await request(app.server)
      .get('/api/user/me')
      .set({ Authorization: 'Bearer ' + authResponse.body.access_token });

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      email: 'teste@teste.com',
      id: expect.any(String),
      role: 'ADMIN',
      name: 'Thiago Leite',
    });
  });
});
