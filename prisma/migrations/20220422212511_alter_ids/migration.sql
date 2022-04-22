/*
  Warnings:

  - The primary key for the `InvolvedCompanies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `InvolvedCompanies` table. All the data in the column will be lost.
  - The primary key for the `ProductsOnGenres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductsOnGenres` table. All the data in the column will be lost.
  - The primary key for the `ProductsOnPlatforms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductsOnPlatforms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InvolvedCompanies" DROP CONSTRAINT "InvolvedCompanies_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "InvolvedCompanies_pkey" PRIMARY KEY ("companyId", "productId");

-- AlterTable
ALTER TABLE "ProductsOnGenres" DROP CONSTRAINT "ProductsOnGenres_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProductsOnGenres_pkey" PRIMARY KEY ("genreId", "productId");

-- AlterTable
ALTER TABLE "ProductsOnPlatforms" DROP CONSTRAINT "ProductsOnPlatforms_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProductsOnPlatforms_pkey" PRIMARY KEY ("platformId", "productId");
