import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterUserService } from '../services/factories/make-register-user-service';

const registerUserSchema = z.object({
  name: z.string(),
  password: z.string().min(6),
  email: z.string().email(),
  residence: z.object({
    bloco: z.string(),
    apto: z.string(),
  }),
});

export const registerUser = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  const { residence, email, name, password } = registerUserSchema.parse(
    req.body
  );

  const registerUserService = makeRegisterUserService();

  await registerUserService.execute({ residence, email, name, password });

  return rep.status(201).send();
};
