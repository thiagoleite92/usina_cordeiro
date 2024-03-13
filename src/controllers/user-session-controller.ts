import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFindUserByIdService } from '../services/factories/make-find-user-by-id-service';

export const userSession = async (req: FastifyRequest, rep: FastifyReply) => {
  const findUserByIdService = makeFindUserByIdService();

  const user = await findUserByIdService.execute(req.user.sub);

  return rep.status(200).send({ user });
};
