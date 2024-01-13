import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { prisma } from '../../lib/prisma';
import { hash } from 'bcrypt';

export const createAndAuthenticateAdmin = async (
  app: FastifyInstance,
  isAdmin = false
) => {
  const { id } = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'DWELLER',
    },
  });

  const authResponse = await request(app.server).post('/api/auth').send({
    email: 'john.doe@gmail.com',
    password: '123456',
  });

  const { access_token } = authResponse.body;

  return { access_token, userId: id };
};

export const createAndAuthenticateDweller = async (
  app: FastifyInstance,
  isAdmin = false
) => {
  const { id } = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'dweller@gmail.com',
      password: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'DWELLER',
    },
  });

  const authResponse = await request(app.server).post('/api/auth').send({
    email: 'dweller@gmail.com',
    password: '123456',
  });

  const { access_token } = authResponse.body;

  return { access_token, userId: id };
};
