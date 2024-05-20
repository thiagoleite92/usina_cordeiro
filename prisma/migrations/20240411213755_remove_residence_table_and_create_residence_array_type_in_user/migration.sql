/*
  Warnings:

  - You are about to drop the column `residenceApto` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `residenceBloco` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Residence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_residenceApto_residenceBloco_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "residenceApto",
DROP COLUMN "residenceBloco",
ADD COLUMN     "residence" TEXT[];

-- DropTable
DROP TABLE "Residence";
