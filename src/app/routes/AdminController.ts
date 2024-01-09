import { FastifyInstance } from 'fastify';

export const adminRoutes = async (app: FastifyInstance) => {
  app.post('/login', async (req, rep) => {
    console.log(req.body);

    return rep.send('ok');
  });
};
