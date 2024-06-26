import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeDeleteInstallmentService } from '../services/factories/make-delete-installment-service';

export const getInstallmentIdParamSchema = z.object({
  installmentId: z.string(),
});

export const deleteInstallment = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  const { installmentId } = getInstallmentIdParamSchema.parse(req.params);

  const deleteInstallmentService = makeDeleteInstallmentService();

  await deleteInstallmentService.execute(installmentId);

  return rep.status(202).send();
};
