import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeSaveInstallmentService } from '../services/factories/make-save-installment-service';

export const saveInstallment = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const saveInstallmentBodySchema = z.object({
    description: z.string().nullable(),
    value: z.number(),
    installment: z.string().min(1, 'Campo obrigatório'),
    date: z.string(),
    type: z.enum(['INCOME', 'OUTCOME']),
  });

  const { installment, value, description, date, type } =
    saveInstallmentBodySchema.parse(req.body);

  const saveInstallmentUseCase = makeSaveInstallmentService();

  const result = await saveInstallmentUseCase.execute({
    installment,
    value,
    description,
    date,
    type,
    userId: req?.user?.sub,
  });

  return rep.status(201).send({ installment: result });
};
