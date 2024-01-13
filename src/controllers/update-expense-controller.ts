import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeUpdateExpenseService } from '../services/factories/make-update-expense-service';

export const updateExpense = async (req: FastifyRequest, rep: FastifyReply) => {
  const updateExpenseBodySchema = z.object({
    expense: z.string().min(1, 'Campo obrigatório'),
    value: z.number(),
    description: z.string().nullable(),
    date: z.string(),
    id: z.string(),
  });

  const { expense, value, description, date, id } =
    updateExpenseBodySchema.parse(req.body);

  const updateExpenseUseCase = makeUpdateExpenseService();

  await updateExpenseUseCase.execute({
    expense,
    value,
    description,
    date,
    userId: req?.user?.sub,
    id,
  });

  return rep.status(201).send({ message: 'ok' });
};
