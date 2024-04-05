import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeUpdateInstallmentService } from '../services/factories/make-update-installment-service';
import { getInstallmentIdParamSchema } from './delete-installment-controller';

export const updateInstallment = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const { installmentId } = getInstallmentIdParamSchema.parse(req.params);

  const updateInstallmentBodySchema = z.object({
    installmentCategoryId: z.string().min(1, 'Campo obrigatório'),
    value: z.number(),
    description: z.string().nullable(),
    date: z.string(),
    type: z.enum(['INCOME', 'OUTCOME']),
  });

  const { installmentCategoryId, value, description, date } =
    updateInstallmentBodySchema.parse(req.body);

  const updateInstallmentUseCase = makeUpdateInstallmentService();

  await updateInstallmentUseCase.execute({
    installmentCategoryId,
    value,
    description,
    date,
    userId: req?.user?.sub,
    id: installmentId,
  });

  return rep.status(202).send({ message: 'ok' });
};
