import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeAuthenticateUseCase } from '../use-cases/factories/make-authenticate-use-case';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';

export const authenticate = async (req: FastifyRequest, rep: FastifyReply) => {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const access_token = await rep.jwtSign(
      { role: user.role },
      { sign: { sub: user.id } }
    );

    return rep.status(200).send({ access_token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: error.message });
    }

    throw error;
  }
};
