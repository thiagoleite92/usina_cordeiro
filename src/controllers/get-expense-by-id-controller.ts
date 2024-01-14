import { Expense } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindExpenseByIdService } from '../services/factories/make-find-expense-by-id-service';

export const getExpenseById = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<Expense> => {
  const getExpenseIdParamSchema = z.object({
    expenseId: z.string(),
  });

  const { expenseId } = getExpenseIdParamSchema.parse(req.params);

  const findExpenseByIdService = makeFindExpenseByIdService();

  const expense = await findExpenseByIdService.execute(expenseId);

  return rep.status(200).send({ expense });
};
