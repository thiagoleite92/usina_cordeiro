-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'DWELLER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'DWELLER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_CPF_key" ON "User"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
