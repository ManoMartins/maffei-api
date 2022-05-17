/*
  Warnings:

  - A unique constraint covering the columns `[cardNumber]` on the table `CreditCard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentNumber` to the `CreditCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditCard" ADD COLUMN     "documentNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_cardNumber_key" ON "CreditCard"("cardNumber");
