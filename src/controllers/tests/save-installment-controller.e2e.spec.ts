import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../app/app';
import { prisma } from '../../lib/prisma';
import { createAndAuthenticateAdmin } from '../../utils/tests/create-authenticated-user';

describe('e2e => Save Installment', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
    await prisma.installment.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('[POST] /installment should save by admin', async () => {
    const { access_token, userId } = await createAndAuthenticateAdmin(
      app,
      true
    );

    const result = await request(app.server)
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

    const installment = await prisma.installment.findMany();

    expect(result.statusCode).toEqual(201);
    expect(installment).toHaveLength(1);
  });

  it('[POST] /installment should not save by not-admin', async () => {
    const { access_token, userId } = await createAndAuthenticateAdmin(app);

    const result = await request(app.server)
      .post('/api/installment')
      .set('Authorization', 'Bearer ' + access_token)
      .send({
        date: '01/01/2023',
        description: '',
        installment: 'Teste',
        userId,
        value: 1999,
        type: 'INCOME',
      });

    const installment = await prisma.installment.findMany();

    expect(result.statusCode).toEqual(401);
    expect(installment).toHaveLength(0);
  });
});
