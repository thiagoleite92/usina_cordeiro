import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const categories = [
  'Taxas Condominiais',
  'Atrasadas',
  'Recuperadas',
  'Área de Lazer',
  'Encargos Sociais',
  'Despesas Ordinárias',
  'Tarifas Bancárias',
  'Despesas Extraordinárias',
];

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      password: await bcrypt.hash('Senha@123', 8),
      name: 'Thiago Leite',
      role: 'ADMIN',
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'residente@residente.com' },
    update: {},
    create: {
      email: 'residente@residente.com',
      password: await bcrypt.hash('Senha@123', 8),
      name: 'Thiago Leite residente',
      role: 'DWELLER',
      isActive: true,
    },
  });

  for (const category of categories) {
    await prisma.installmentCategory.upsert({
      where: { installmentCategory: `${category}` },
      update: {},
      create: {
        installmentCategory: `${category}`,
      },
    });
  }
};

main();
