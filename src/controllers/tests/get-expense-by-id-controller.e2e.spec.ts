import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../app/app';
import { createAndAuthenticateAdmin } from '../../utils/tests/create-authenticated-user';
import { prisma } from '../../lib/prisma';

describe('e2e => Get Expense By Id', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('[GET] /expense/:expenseId', async () => {
    const { access_token, userId } = await createAndAuthenticateAdmin(
      app,
      true
    );

    await request(app.server)
      .post('/api/expense')
      .set('Authorization', 'Bearer ' + access_token)
      .send({
        date: '01/01/2023',
        description: '',
        expense: 'Serviço',
        userId,
        value: 19.99,
      });

    const createdExpense = await prisma.expense.findMany();
    expect(createdExpense).toHaveLength(1);

    const response = await request(app.server)
      .get(`/api/expense/${createdExpense[0].id}`)
      .set('Authorization', 'Bearer ' + access_token);

    expect(response.statusCode).toEqual(200);

    expect(response.body.expense).toBeDefined();
    expect(response.body).toEqual({
      expense: expect.objectContaining({
        expense: 'Serviço',
        date: new Date('01/01/2023').toISOString(),
        value: '19.99',
      }),
    });
  });
});
