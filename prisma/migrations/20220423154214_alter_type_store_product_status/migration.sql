/*
  Warnings:

  - The `status` column on the `StoreProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StoreProductStatus" AS ENUM ('ENABLED', 'DISABLED');

-- AlterTable
ALTER TABLE "StoreProduct" DROP COLUMN "status",
ADD COLUMN     "status" "StoreProductStatus" NOT NULL DEFAULT E'ENABLED';
