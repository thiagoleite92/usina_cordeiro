import { Installment } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindAllInstallments } from '../services/factories/make-find-all-installments-service';

export const findAllInstallments = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<Installment> => {
  const findAllInstallmentsQuerySchema = z.object({
    page: z.optional(z.coerce.number().default(1)),
    perPage: z.optional(z.coerce.number().default(10)),
    'monthFilter[]': z.optional(z.array(z.string())),
  });

  const {
    page,
    perPage,
    'monthFilter[]': monthFilter,
  } = findAllInstallmentsQuerySchema.parse(req.query);

  const findallinstallmentsService = makeFindAllInstallments();

  const installments = await findallinstallmentsService.execute({
    perPage,
    page,
    monthFilter,
  });

  return rep.status(200).send({ installments });
};
