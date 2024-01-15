import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeDeleteExpenseService } from '../services/factories/make-delete-expense-service';

export const deleteExpense = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  const getExpenseIdParamSchema = z.object({
    expenseId: z.string(),
  });

  const { expenseId } = getExpenseIdParamSchema.parse(req.params);

  const deleteExpenseService = makeDeleteExpenseService();

  await deleteExpenseService.execute(expenseId);

  return rep.status(202).send();
};
