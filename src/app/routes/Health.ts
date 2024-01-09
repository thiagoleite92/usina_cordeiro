import { FastifyInstance } from 'fastify';

export const healthRoutes = async (app: FastifyInstance) => {
  app.get('/', async (req, rep) => {
    return rep.status(200).send({ status: 'OK' });
  });
};
