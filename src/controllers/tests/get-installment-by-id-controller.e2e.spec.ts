import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../app/app';
import { createAndAuthenticateAdmin } from '../../utils/tests/create-authenticated-user';
import { prisma } from '../../lib/prisma';

describe('e2e => Get Installment By Id', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('[GET] /installment/:installmentId', async () => {
    const { access_token, userId } = await createAndAuthenticateAdmin(
      app,
      true
    );

    await request(app.server)
      .post('/api/installment')
      .set('Authorization', 'Bearer ' + access_token)
      .send({
        date: '01/01/2023',
        description: '',
        installmentCategoryId: 'Serviço',
        userId,
        value: 1999,
        type: 'INCOME',
      });

    const createdInstallment = await prisma.installment.findMany();
    expect(createdInstallment).toHaveLength(1);

    const response = await request(app.server)
      .get(`/api/installment/${createdInstallment[0].id}`)
      .set('Authorization', 'Bearer ' + access_token);

    expect(response.statusCode).toEqual(200);

    expect(response.body.installment).toBeDefined();
    expect(response.body).toEqual({
      installment: expect.objectContaining({
        installmentCategoryId: expect.any(String),
        date: new Date('01/01/2023').toISOString(),
        value: 1999,
      }),
    });
  });
});
