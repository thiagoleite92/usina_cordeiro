import { Installment } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetAllUsersService } from '../services/factories/make-get-installment-categories-service copy';

export const getAllUsers = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<Installment> => {
  const getAllUsersService = makeGetAllUsersService();

  const users = await getAllUsersService.execute();

  return rep.status(200).send({ users });
};
