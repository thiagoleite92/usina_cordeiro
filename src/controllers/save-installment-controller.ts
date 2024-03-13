import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeSaveInstallmentService } from '../services/factories/make-save-installment-service';

export const saveInstallment = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const saveInstallmentBodySchema = z.object({
    installment: z.string().min(1, 'Campo obrigatório'),
    value: z.number(),
    description: z.string().nullable(),
    date: z.string(),
    type: z.enum(['INCOME', 'OUTCOME']),
  });

  const { installment, value, description, date } =
    saveInstallmentBodySchema.parse(req.body);

  const saveInstallmentUseCase = makeSaveInstallmentService();

  await saveInstallmentUseCase.execute({
    installment,
    value,
    description,
    date,
    userId: req?.user?.sub,
  });

  return rep.status(201).send({ message: 'ok' });
};
