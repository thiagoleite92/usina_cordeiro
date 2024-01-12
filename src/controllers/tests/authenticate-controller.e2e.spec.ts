import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import * as bcrypt from 'bcrypt';

import { app } from '../../app/app';
import { prisma } from '../../lib/prisma';

describe('e2e => authenticate', () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(async () => {
    await prisma.user.create({
      data: {
        email: 'teste@teste.com',
        password: await bcrypt.hash('Senha@123', 6),
        name: 'Thiago Leite',
        role: 'ADMIN',
      },
    });
  });

  afterAll(async () => {});

  it('should be able to authenticate', async () => {
    const response = await request(app.server)
      .post('/api/auth')
      .send({ email: 'teste@teste.com', password: 'Senha@123' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ access_token: expect.any(String) });
  });
});
