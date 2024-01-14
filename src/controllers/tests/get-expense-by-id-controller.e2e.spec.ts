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

    const {
      body: { expense },
    } = response;

    expect(expense).toBeDefined();
    expect(expense.value).toEqual('19.99');
    expect(expense.expense).toEqual('Serviço');
    expect(expense.description).toEqual('');
    expect(expense.date).toEqual(new Date('01/01/2023').toISOString());
  });
});
