import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeSaveExpenseService } from '../services/factories/make-save-expense-service';

export const saveExpense = async (req: FastifyRequest, rep: FastifyReply) => {
  const saveExpenseBodySchema = z.object({
    expense: z.string().min(1, 'Campo obrigatório'),
    value: z.number(),
    description: z.string().nullable(),
    date: z.string(),
  });

  const { expense, value, description, date } = saveExpenseBodySchema.parse(
    req.body
  );

  const saveExpenseUseCase = makeSaveExpenseService();

  await saveExpenseUseCase.execute({
    expense,
    value,
    description,
    date,
    userId: req?.user?.sub,
  });

  return rep.status(200).send({ message: 'ok' });
};
