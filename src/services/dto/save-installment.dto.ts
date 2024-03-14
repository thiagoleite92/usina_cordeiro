export type SaveInstallmentDTO = {
  installment: string;
  value: number;
  description: string | null;
  date: Date;
  userId: string;
};
