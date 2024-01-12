export type SaveExpenseDTO = {
  expense: string;
  value: number;
  description: string | null;
  date: Date;
  userId: string;
};
