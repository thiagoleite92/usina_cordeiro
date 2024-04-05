import { Installment } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetInstallmentCategoriesService } from '../services/factories/make-get-installment-categories-service';

export const getInstallmentCategories = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<Installment> => {
  const getInstallmentCategories = makeGetInstallmentCategoriesService();

  const installmentCategories = await getInstallmentCategories.execute();

  return rep.status(200).send({ installmentCategories });
};
