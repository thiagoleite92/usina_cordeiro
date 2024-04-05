import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../app/app';
import {
  createAndAuthenticateAdmin,
  createAndAuthenticateDweller,
} from '../../utils/tests/create-authenticated-user';
import { prisma } from '../../lib/prisma';

describe('e2e => Update Installment', () => {
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

  it('[PUT] /update-installment should update by admin', async () => {
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
      .put('/api/installment/' + createdInstallment[0]?.id)
      .set('Authorization', 'Bearer ' + access_token)
      .send({
        date: '01/02/2023',
        description: 'Agora com descrição',
        installmentCategoryId: 'Serviço',
        userId,
        value: 1299,
        type: 'INCOME',
      });

    expect(response.statusCode).toEqual(202);

    const updatedInstallment = await prisma.installment.findMany();
    expect(updatedInstallment[0].description).toEqual('Agora com descrição');
    expect(updatedInstallment[0].value).toEqual(1299);
    expect(updatedInstallment).toHaveLength(1);
  });

  it('[PUT] /update-installment should not update by not-admin', async () => {
    const admin = await createAndAuthenticateAdmin(app, true);
    const dweller = await createAndAuthenticateDweller(app, false);

    const created = await request(app.server)
      .post('/api/installment')
      .set('Authorization', 'Bearer ' + admin.access_token)
      .send({
        date: '01/01/2023',
        description: '',
        installmentCategoryId: 'Serviço',
        userId: admin.userId,
        value: 19.99,
        type: 'INCOME',
      });

    const response = await request(app.server)
      .put('/api/installment/' + created.body?.installment?.id)
      .set('Authorization', 'Bearer ' + dweller.access_token)
      .send({
        date: '01/01/2023',
        description: 'Atualizado',
        installmentCategoryId: 'Serviço',
        userId: dweller.userId,
        type: 'OUTCOME',
        value: 12.99,
      });

    const installment = await prisma.installment.findMany();

    expect(response.statusCode).toEqual(401);
    expect(installment).toHaveLength(1);
  });
});
