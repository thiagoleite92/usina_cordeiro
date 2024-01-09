import { FastifyInstance } from 'fastify';
import { loginSchema } from './validation';
import { z } from 'zod';

export const adminRoutes = async (app: FastifyInstance) => {
  app.post('/login', async (req, rep) => {
    try {
      const { cpf, email } = loginSchema.parse(req.body);

      return rep.send('ok');
    } catch (error) {
      const errorJson = JSON.stringify(error);
      if (error instanceof z.ZodError) {
        return rep.status(400).send(errorJson);
      } else {
        return rep.status(500).send(errorJson);
      }
    }
  });
};
