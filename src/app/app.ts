import fastify from 'fastify';
import cors from '@fastify/cors';
import { adminRoutes } from './routes/AdminRoutes';
import { healthRoutes } from './routes/Health';

export const app = fastify();

app.register(cors, {});

app.register(healthRoutes, {
  prefix: '/api/health',
});

app.register(adminRoutes, {
  prefix: '/api/admin',
});
