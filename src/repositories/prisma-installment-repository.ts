import { prisma } from '../lib/prisma';
import { SaveInstallmentDTO } from '../services/dto/save-installment.dto';
import { UpdateInstallmentDTO } from '../services/dto/update-installment.dto';
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
}
