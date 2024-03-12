-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_user_id_fkey";

-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
