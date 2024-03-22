import { InstallmentCategory } from '@prisma/client';
import { InstallmentCategoriesInterface } from '../interfaces/installment-categories-interface';
import { createId } from '@paralleldrive/cuid2';

export class InMemoryInstallmentCategoriesRepository
  implements InstallmentCategoriesInterface
{
  public items: Array<InstallmentCategory> = [];

  async findOrCreate(category: string) {
    const installmentCategory = this.items.find((item) => item.id === category);

    if (installmentCategory) return installmentCategory;

    const data: InstallmentCategory = {
      id: createId(),
      installmentCategory: category,
    };

    this.items.push(data);

    return data;
  }
}
