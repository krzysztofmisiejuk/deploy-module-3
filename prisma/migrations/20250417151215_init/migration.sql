/*
  Warnings:

  - Added the required column `brandName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brandName" TEXT NOT NULL,
ADD COLUMN     "categoryName" TEXT NOT NULL;
