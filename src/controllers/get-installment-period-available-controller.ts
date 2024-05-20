import { Installment } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeAvailablePeriodsService } from '../services/factories/make-available-periods-service';

export const getInstallmentPeriodsAvailable = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<Installment> => {
  const availablePeriodService = makeAvailablePeriodsService();

  const availablePeriods = await availablePeriodService.execute();

  return rep.status(200).send({ availablePeriods });
};
