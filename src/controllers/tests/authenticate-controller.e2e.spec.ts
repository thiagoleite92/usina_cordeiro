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

  it('should be able to authenticate', async () => {
    const response = await request(app.server)
      .post('/api/auth')
      .send({ email: 'teste@teste.com', password: 'Senha@123' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ access_token: expect.any(String) });
  });

  it('should not be able to authenticate  with wrong password', async () => {
    const response = await request(app.server)
      .post('/api/auth')
      .send({ email: 'teste@teste.com', password: 'SenhaErrada' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('Credenciais não conferem');
  });

  it('should not be able to authenticate  with wrong email', async () => {
    const response = await request(app.server)
      .post('/api/auth')
      .send({ email: 'email@errado.com', password: 'Senha@123' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('Credenciais não conferem');
  });
});
