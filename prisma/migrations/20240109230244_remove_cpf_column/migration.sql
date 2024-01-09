/*
  Warnings:

  - You are about to drop the column `CPF` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_CPF_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "CPF";
