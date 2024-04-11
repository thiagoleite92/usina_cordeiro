-- AlterTable
ALTER TABLE "users" ADD COLUMN     "residenceApto" TEXT,
ADD COLUMN     "residenceBloco" TEXT;

-- CreateTable
CREATE TABLE "Residence" (
    "id" TEXT NOT NULL,
    "apto" TEXT NOT NULL,
    "bloco" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Residence_apto_bloco_key" ON "Residence"("apto", "bloco");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_residenceApto_residenceBloco_fkey" FOREIGN KEY ("residenceApto", "residenceBloco") REFERENCES "Residence"("apto", "bloco") ON DELETE SET NULL ON UPDATE CASCADE;
