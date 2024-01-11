import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';
import { makeAuthenticateService } from '../services/factories/make-authenticate-service';

export const authenticate = async (req: FastifyRequest, rep: FastifyReply) => {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateService();

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
