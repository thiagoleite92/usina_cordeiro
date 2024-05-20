import { FastifyReply, FastifyRequest } from 'fastify';
import { makeUserUpdateStatusService } from '../services/factories/make-user-update-status-service';
import { z } from 'zod';

const residentIdParams = z.object({
  residentId: z.string(),
});

export const userUpdateStatus = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const { residentId } = residentIdParams.parse(req.params);

  const userUpdateStatusService = makeUserUpdateStatusService();

  await userUpdateStatusService.execute(residentId);

  return rep.status(202).send();
};
