import { Installment } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindInstallmentByIdService } from '../services/factories/make-find-installment-by-id-service';

export const getInstallmentById = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<Installment> => {
  const getInstallmentIdParamSchema = z.object({
    installmentId: z.string(),
  });

  const { installmentId } = getInstallmentIdParamSchema.parse(req.params);

  const findInstallmentByIdService = makeFindInstallmentByIdService();

  const installment = await findInstallmentByIdService.execute(installmentId);

  return rep.status(200).send({ installment });
};
