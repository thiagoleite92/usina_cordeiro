import { Installment } from '@prisma/client';
import { SaveInstallmentDTO } from '../../services/dto/save-installment.dto';
import { UpdateExpanseDTO } from '../../services/dto/update-installment.dto';

export interface InstallmentRepositoryInterface {
  save(installment: SaveInstallmentDTO): Promise<Installment>;
  update(installment: UpdateExpanseDTO): Promise<Installment | null>;
  findById(id: string): Promise<Installment | null>;
  delete(id: string): Promise<void>;
  getItems(): Promise<Installment[]>;
}
