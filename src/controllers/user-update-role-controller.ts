import { FastifyReply, FastifyRequest } from 'fastify';
import { makeUserUpdateRoleService } from '../services/factories/make-user-update-role-service';
import { z } from 'zod';

const residentIdParams = z.object({
  residentId: z.string(),
});

export const userUpdateRole = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const { residentId } = residentIdParams.parse(req.params);

  const userUpdateRoleService = makeUserUpdateRoleService();

  await userUpdateRoleService.execute(residentId);

  return rep.status(202).send();
};
