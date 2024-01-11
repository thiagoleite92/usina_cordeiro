import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeAuthenticateUseCase } from '../use-cases/factories/make-authenticate-use-case';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const access_token = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id } }
    );

    return reply.status(200).send({ access_token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
