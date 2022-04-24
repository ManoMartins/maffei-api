-- DropForeignKey
ALTER TABLE "InvolvedCompanies" DROP CONSTRAINT "InvolvedCompanies_companyId_fkey";

-- DropForeignKey
ALTER TABLE "InvolvedCompanies" DROP CONSTRAINT "InvolvedCompanies_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnGenres" DROP CONSTRAINT "ProductsOnGenres_genreId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnGenres" DROP CONSTRAINT "ProductsOnGenres_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnPlatforms" DROP CONSTRAINT "ProductsOnPlatforms_platformId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnPlatforms" DROP CONSTRAINT "ProductsOnPlatforms_productId_fkey";

-- AddForeignKey
ALTER TABLE "InvolvedCompanies" ADD CONSTRAINT "InvolvedCompanies_productId_fkey" FOREIGN KEY ("productId") REFERENCES "StoreProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvolvedCompanies" ADD CONSTRAINT "InvolvedCompanies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnPlatforms" ADD CONSTRAINT "ProductsOnPlatforms_productId_fkey" FOREIGN KEY ("productId") REFERENCES "StoreProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnPlatforms" ADD CONSTRAINT "ProductsOnPlatforms_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnGenres" ADD CONSTRAINT "ProductsOnGenres_productId_fkey" FOREIGN KEY ("productId") REFERENCES "StoreProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnGenres" ADD CONSTRAINT "ProductsOnGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
