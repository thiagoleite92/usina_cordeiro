import { SaveInstallmentDTO } from '../../services/dto/save-installment.dto';
import { InstallmentRepositoryInterface } from '../interfaces/installment-repository-interface';
import { Installment } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';
import { UpdateInstallmentDTO } from '../../services/dto/update-installment.dto';

export class InMemoryInstallmentRepository
  implements InstallmentRepositoryInterface
{
  public items: Array<Installment> = [];

  async findAllInstallments() {
    return this.items;
  }

  async update({
    id,
    date,
    description,
    installmentCategoryId,
    value,
  }: UpdateInstallmentDTO) {
    const foundInstallment = this.items.find((item) => item.id === id);

    if (!foundInstallment) {
      return null;
    }

    foundInstallment.date = date ? date : foundInstallment.date;
    foundInstallment.description = description
      ? description
      : foundInstallment.description;
    foundInstallment.installmentCategoryId = installmentCategoryId
      ? foundInstallment.installmentCategoryId
      : foundInstallment.installmentCategoryId;
    foundInstallment.value = value ? value : foundInstallment.value;

    return foundInstallment;
  }

  async save(data: SaveInstallmentDTO) {
    const installment: Installment = {
      id: createId(),
      installmentCategoryId: data.installmentCategoryId,
      date: data.date,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
      value: data.value,
      type: data.type,
    };

    this.items.push(installment);

    return installment;
  }

  async findById(id: string) {
    const foundInstallment = this.items.find((item) => item.id === id);

    return foundInstallment ? foundInstallment : null;
  }

  async delete(id: string) {
    const installmentIndex = this.items.findIndex((item) => item.id === id);

    if (installmentIndex === -1) {
      return;
    }

    this.items.splice(installmentIndex, 1);
  }

  async getItems() {
    return this.items;
  }

  async getAvailablePeriods(): Promise<{ date: Date }[]> {
    throw new Error('Method not implemented.');
  }
}
