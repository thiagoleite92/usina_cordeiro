import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const saveExpense = async (req: FastifyRequest, rep: FastifyReply) => {
  const saveExpenseBodySchema = z.object({
    expense: z.string(),
    value: z.number(),
    description: z.string().nullable(),
    date: z.string(),
  });

  const { expense, value, description, date } = saveExpenseBodySchema.parse(
    req.body
  );

  return rep.status(200).send('ok');
};
