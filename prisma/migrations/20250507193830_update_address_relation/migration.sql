-- DropIndex
DROP INDEX "Address_userId_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "isMainAddress" BOOLEAN NOT NULL DEFAULT false;
