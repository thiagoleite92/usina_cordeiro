import { prisma } from '../lib/prisma';
import { SaveInstallmentDTO } from '../services/dto/save-installment.dto';
import { UpdateInstallmentDTO } from '../services/dto/update-installment.dto';
import { findAllInstallmentsRequest } from '../services/find-all-installments-service';
import { InstallmentRepositoryInterface } from './interfaces/installment-repository-interface';

export class PrismaInstallmentRepository
  implements InstallmentRepositoryInterface
{
  async update(installment: UpdateInstallmentDTO) {
    return await prisma.installment.update({
      where: { id: installment.id },
      data: installment,
    });
  }

  async save(installment: SaveInstallmentDTO) {
    return await prisma.installment.create({ data: installment });
  }
  async findById(id: string) {
    return await prisma.installment.findUnique({ where: { id } });
  }

  async delete(id: string) {
    await prisma.installment.delete({ where: { id } });
    return;
  }

  async getItems() {
    return prisma.installment.findMany();
  }

  async findAllInstallments({
    perPage = 10,
    page = 1,
    monthFilter,
  }: findAllInstallmentsRequest) {
    return prisma.installment.findMany({
      orderBy: {
        date: 'desc',
      },
      where: {
        AND: [
          { date: monthFilter ? { gte: new Date(monthFilter[0]) } : {} },
          { date: monthFilter ? { lte: new Date(monthFilter[1]) } : {} },
        ],
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });
  }

  async getAvailablePeriods() {
    return prisma.installment.findMany({
      orderBy: {
        date: 'desc',
      },
      select: { date: true },
      distinct: ['date'],
    });
  }
}
