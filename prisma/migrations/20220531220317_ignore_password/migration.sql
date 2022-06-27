/*
  Warnings:

  - You are about to alter the column `name` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(90)`.

*/
-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "name" SET DATA TYPE VARCHAR(90);
