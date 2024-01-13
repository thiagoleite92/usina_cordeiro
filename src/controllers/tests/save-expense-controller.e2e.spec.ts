import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../app/app';
import { prisma } from '../../lib/prisma';
import { createAndAuthenticateAdmin } from '../../utils/tests/create-authenticated-user';

describe('e2e => Save Expense', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('[POST] /save-expense should save by admin', async () => {
    const { access_token, userId } = await createAndAuthenticateAdmin(
      app,
      true
    );

    const result = await request(app.server)
      .post('/api/save-expense')
      .set('Authorization', 'Bearer ' + access_token)
      .send({
        date: '01/01/2023',
        description: '',
        expense: 'Serviço',
        userId,
        value: 19.99,
      });

    const expense = await prisma.expense.findMany();

    expect(result.statusCode).toEqual(201);
    expect(expense).toHaveLength(1);
  });

  it('[POST] /save-expense should not save by not-admin', async () => {
    const { access_token, userId } = await createAndAuthenticateAdmin(app);

    const result = await request(app.server)
      .post('/api/save-expense')
      .set('Authorization', 'Bearer ' + access_token)
      .send({
        date: '01/01/2023',
        description: '',
        expense: 'Serviço',
        userId,
        value: 19.99,
      });

    const expense = await prisma.expense.findMany();

    expect(result.statusCode).toEqual(401);
    expect(expense).toHaveLength(0);
  });
});
