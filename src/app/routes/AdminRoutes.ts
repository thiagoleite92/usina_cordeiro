import { FastifyInstance } from 'fastify';
import { loginSchema } from '../validations/validation';
import { z } from 'zod';
import { userService } from '../services/userService';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import * as bcrypt from 'bcrypt';

export const adminRoutes = async (app: FastifyInstance) => {
  app.post('/login', async (req, rep) => {
    try {
      const { login, password } = loginSchema.parse(req.body);

      const user = await userService.findUserByEmail(login);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ResourceNotFoundError('E-mail ou login não conferem.');
      }

      return rep.send('ok');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorJson = JSON.stringify(error);
        return rep.status(400).send(errorJson);
      }

      if (error instanceof ResourceNotFoundError) {
        return rep.status(400).send(error.message);
      }

      return rep.status(500).send(error.message);
    }
  });
};
