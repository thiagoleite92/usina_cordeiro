import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeUpdateInstallmentService } from '../services/factories/make-update-installment-service';

export const updateInstallment = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const updateInstallmentBodySchema = z.object({
    installmentCategoryId: z.string().min(1, 'Campo obrigatório'),
    value: z.number(),
    description: z.string().nullable(),
    date: z.string(),
    id: z.string(),
    type: z.enum(['INCOME', 'OUTCOME']),
  });

  const { installmentCategoryId, value, description, date, id } =
    updateInstallmentBodySchema.parse(req.body);

  const updateInstallmentUseCase = makeUpdateInstallmentService();

  await updateInstallmentUseCase.execute({
    installmentCategoryId,
    value,
    description,
    date,
    userId: req?.user?.sub,
    id,
  });

  return rep.status(202).send({ message: 'ok' });
};
