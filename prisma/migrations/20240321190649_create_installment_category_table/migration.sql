/*
  Warnings:

  - You are about to drop the column `installment` on the `installments` table. All the data in the column will be lost.
  - Added the required column `installment_category_id` to the `installments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "installments" DROP COLUMN "installment",
ADD COLUMN     "installment_category_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "installment_categories" (
    "id" TEXT NOT NULL,
    "installment_category" TEXT NOT NULL,

    CONSTRAINT "installment_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "installment_categories_installment_category_key" ON "installment_categories"("installment_category");

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_installment_category_id_fkey" FOREIGN KEY ("installment_category_id") REFERENCES "installment_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
