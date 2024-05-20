import { InstallmentEnum } from '@prisma/client';

export type SaveInstallmentDTO = {
  installmentCategoryId: string;
  value: number;
  description: string | null;
  date: Date;
  userId: string;
  type: InstallmentEnum;
};
