import { FastifyReply, FastifyRequest } from 'fastify';

export const verifyUserRole =
  (roleToVerify: 'ADMIN' | 'MEMBER') =>
  async (req: FastifyRequest, rep: FastifyReply) => {
    const { role } = req.user;

    if (role !== roleToVerify) {
      return rep.status(401).send({ message: 'Unauthorized' });
    }
  };
