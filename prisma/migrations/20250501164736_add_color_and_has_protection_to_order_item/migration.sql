-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "color" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "hasProtection" BOOLEAN NOT NULL DEFAULT false;
