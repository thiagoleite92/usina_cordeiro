import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../app/app';
import {
  createAndAuthenticateAdmin,
  createAndAuthenticateDweller,
} from '../../utils/tests/create-authenticated-user';
import { prisma } from '../../lib/prisma';

describe('e2e => Delete Expense Controller', async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('[DELETE] /api/expense should delete expense by admin', async () => {
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

    const createdExpenseBefore = await prisma.expense.findMany();
    expect(createdExpenseBefore).toHaveLength(1);

    const response = await request(app.server)
      .delete(`/api/expense/${createdExpenseBefore[0].id}`)
      .set('Authorization', 'Bearer ' + access_token);

    expect(response.statusCode).toEqual(202);
    expect(response.body).toEqual({});

    const createdExpenseAfter = await prisma.expense.findMany();
    expect(createdExpenseAfter).toHaveLength(0);
  });

  it('[DELETE] /api/expense should not delete expense by dweller', async () => {
    const { access_token: admin_token, userId: adminId } =
      await createAndAuthenticateAdmin(app, true);

    const { access_token: dweller_token } = await createAndAuthenticateDweller(
      app
    );

    await request(app.server)
      .post('/api/expense')
      .set('Authorization', 'Bearer ' + admin_token)
      .send({
        date: '01/01/2023',
        description: '',
        expense: 'Serviço',
        userId: adminId,
        value: 19.99,
      });

    const createdExpenseBefore = await prisma.expense.findMany();
    expect(createdExpenseBefore).toHaveLength(1);

    const response = await request(app.server)
      .delete(`/api/expense/${createdExpenseBefore[0].id}`)
      .set('Authorization', 'Bearer ' + dweller_token);

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Não Autorizado');

    const createdExpenseAfter = await prisma.expense.findMany();
    expect(createdExpenseAfter).toHaveLength(1);
  });
});
