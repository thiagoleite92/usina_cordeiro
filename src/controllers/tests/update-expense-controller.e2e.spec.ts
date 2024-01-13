import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../app/app';
import {
  createAndAuthenticateAdmin,
  createAndAuthenticateDweller,
} from '../../utils/tests/create-authenticated-user';
import { prisma } from '../../lib/prisma';

describe('e2e => Update Expense', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('[POST] /update-expense should update by admin', async () => {
    const { access_token, userId } = await createAndAuthenticateAdmin(
      app,
      true
    );

    await request(app.server)
      .post('/api/save-expense')
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
      .post('/api/update-expense')
      .set('Authorization', 'Bearer ' + access_token)
      .send({
        date: '01/02/2023',
        description: 'Agora com descrição',
        expense: 'Atualizado',
        userId,
        value: 12.99,
        id: createdExpense[0]?.id,
      });

    expect(response.statusCode).toEqual(202);

    const updatedExpense = await prisma.expense.findMany();
    expect(updatedExpense[0].description).toEqual('Agora com descrição');
    expect(updatedExpense[0].value.toNumber()).toEqual(12.99);
    expect(updatedExpense[0].expense).toEqual('Atualizado');
    expect(updatedExpense).toHaveLength(1);
  });

  it('[POST] /update-expense should not update by not-admin', async () => {
    const admin = await createAndAuthenticateAdmin(app, true);
    const dweller = await createAndAuthenticateDweller(app, false);

    await request(app.server)
      .post('/api/save-expense')
      .set('Authorization', 'Bearer ' + admin.access_token)
      .send({
        date: '01/01/2023',
        description: '',
        expense: 'Serviço',
        userId: admin.userId,
        value: 19.99,
      });

    const response = await request(app.server)
      .post('/api/update-expense')
      .set('Authorization', 'Bearer ' + dweller.access_token)
      .send({
        date: '01/01/2023',
        description: 'Atualizado',
        expense: 'Serviço',
        userId: dweller.userId,
        value: 12.99,
      });

    const expense = await prisma.expense.findMany();

    expect(response.statusCode).toEqual(401);
    expect(expense).toHaveLength(1);
  });
});
