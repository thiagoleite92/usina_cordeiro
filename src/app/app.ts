import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import { env } from '../env';
import { healthRoutes } from './routes/Health';
import { userRoutes } from './routes/UserRoutes';
import { ZodError } from 'zod';
import { UnauthorizedError } from './errors/UnauthorizedError';

export const app = fastify();

app.register(jwt, {
  secret: env.JWT_SECRET,
});

app.register(cors, {
  origin: '*',
});

app.register(healthRoutes, {
  prefix: '/api/health',
});

app.register(userRoutes, { prefix: '/api' });

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({ message: error.message });
  }

  console.log(error);

  return reply.status(500).send({ message: 'Internal Server Error' });
});
