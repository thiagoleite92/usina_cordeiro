import { prisma } from '../lib/prisma';
import { InstallmentCategoriesInterface } from './interfaces/installment-categories-interface';

export class PrismaInstallmentCategoriesRepository
  implements InstallmentCategoriesInterface
{
  getAllCategories(): Promise<{ id: string; installmentCategory: string }[]> {
    return prisma.installmentCategory.findMany();
  }
  async findOrCreate(category: string) {
    const installmentCategory = await prisma.installmentCategory.findFirst({
      where: { OR: [{ installmentCategory: category }, { id: category }] },
    });

    if (installmentCategory) return installmentCategory;

    return await prisma.installmentCategory.create({
      data: { installmentCategory: category },
    });
  }
}
