import { SaveInstallmentDTO } from './save-installment.dto';

export type UpdateInstallmentDTO = Partial<SaveInstallmentDTO> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
