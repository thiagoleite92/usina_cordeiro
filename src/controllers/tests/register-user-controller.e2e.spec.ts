import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '../../app/app';

describe('e2e => Register User', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('[POST] /api/user should register new user', async () => {
    const response = await request(app.server)
      .post('/api/user')
      .send({
        email: 'email@email.com',
        password: 'Senha@123',
        name: 'Novo Morador',
        residence: {
          bloco: 'j',
          apto: '102',
        },
      });

    expect(response.statusCode).toBe(201);
  });

  it('[POST] /api/user should not register new user with duplicate email', async () => {
    await request(app.server)
      .post('/api/user')
      .send({
        email: 'email@email.com',
        password: 'Senha@123',
        name: 'Novo Morador',
        residence: {
          bloco: 'j',
          apto: '102',
        },
      });

    const response = await request(app.server)
      .post('/api/user')
      .send({
        email: 'email@email.com',
        password: 'Senha@123',
        name: 'Novo Morador',
        residence: {
          bloco: 'j',
          apto: '102',
        },
      });

    expect(response.statusCode).toBe(409);
  });
});
