import { InstallmentCategory } from '@prisma/client';

export interface InstallmentCategoriesInterface {
  findOrCreate(category: string): Promise<InstallmentCategory>;
  getAllCategories(): Promise<InstallmentCategory[]>;
}
