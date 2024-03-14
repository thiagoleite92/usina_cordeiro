import { Installment } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindAllInstallments } from '../services/factories/make-find-all-installments-service';

export const findAllInstallments = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<Installment> => {
  const findAllInstallmentsQuerySchema = z.object({
    search: z.optional(z.string()),
  });

  const { search } = findAllInstallmentsQuerySchema.parse(req.query);

  const findallinstallmentsService = makeFindAllInstallments();

  const installments = await findallinstallmentsService.execute({ search });

  return rep.status(200).send({ installments });
};
