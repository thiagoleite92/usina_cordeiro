import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import { env } from '../env';
import { healthRoutes } from './routes/Health';
import { userRoutes } from './routes/UserRoutes';

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
