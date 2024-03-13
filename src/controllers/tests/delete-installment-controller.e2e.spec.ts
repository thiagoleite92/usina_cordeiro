import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../app/app';
import {
  createAndAuthenticateAdmin,
  createAndAuthenticateDweller,
} from '../../utils/tests/create-authenticated-user';
import { prisma } from '../../lib/prisma';

describe('e2e => Delete Installment Controller', async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('[DELETE] /api/installment should delete installment by admin', async () => {
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
        installment: 'Serviço',
        userId,
        value: 19.99,
        type: 'INCOME',
      });

    const createdInstallmentBefore = await prisma.installment.findMany();
    expect(createdInstallmentBefore).toHaveLength(1);

    const response = await request(app.server)
      .delete(`/api/installment/${createdInstallmentBefore[0].id}`)
      .set('Authorization', 'Bearer ' + access_token);

    expect(response.statusCode).toEqual(202);
    expect(response.body).toEqual({});

    const createdInstallmentAfter = await prisma.installment.findMany();
    expect(createdInstallmentAfter).toHaveLength(0);
  });

  it('[DELETE] /api/installment should not delete installment by dweller', async () => {
    const { access_token: admin_token, userId: adminId } =
      await createAndAuthenticateAdmin(app, true);

    const { access_token: dweller_token } = await createAndAuthenticateDweller(
      app
    );

    await request(app.server)
      .post('/api/installment')
      .set('Authorization', 'Bearer ' + admin_token)
      .send({
        date: '01/01/2023',
        description: '',
        installment: 'Serviço',
        userId: adminId,
        value: 19.99,
        type: 'INCOME',
      });

    const createdInstallmentBefore = await prisma.installment.findMany();
    expect(createdInstallmentBefore).toHaveLength(1);

    const response = await request(app.server)
      .delete(`/api/installment/${createdInstallmentBefore[0].id}`)
      .set('Authorization', 'Bearer ' + dweller_token);

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Não Autorizado');

    const createdInstallmentAfter = await prisma.installment.findMany();
    expect(createdInstallmentAfter).toHaveLength(1);
  });
});
