import { Installment } from '@prisma/client';
import { SaveInstallmentDTO } from '../../services/dto/save-installment.dto';
import { UpdateInstallmentDTO } from '../../services/dto/update-installment.dto';
import { findAllInstallmentsRequest } from '../../services/find-all-installments-service';

export interface InstallmentRepositoryInterface {
  save(installment: SaveInstallmentDTO): Promise<Installment>;
  update(installment: UpdateInstallmentDTO): Promise<Installment | null>;
  findById(id: string): Promise<Installment | null>;
  delete(id: string): Promise<void>;
  getItems(): Promise<Installment[]>;
  findAllInstallments(
    query?: findAllInstallmentsRequest
  ): Promise<Installment[]>;
}
