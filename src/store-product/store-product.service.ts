import { kebabCase } from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { UpdateStatusStoreProductDto } from './dto/update-status-store-product-dto';
import { QueryDto } from './dto/quey.dto';

@Injectable()
export class StoreProductService {
  constructor(private readonly prisma: PrismaService) {}

  private getDiffIds(oldData: any[], newData: any[], accessor: string) {
    const oldDataIds = oldData.map((data) => data[accessor]);
    const newDataIds = newData.map((data) => data[accessor]);

    const diffDataIds = oldDataIds.filter(
      (dataId) => !newDataIds.includes(dataId),
    );

    const diffDataFormatted = diffDataIds.map((dataId) => {
      return {
        [accessor]: dataId,
      };
    });

    return diffDataFormatted;
  }

  async create(createStoreProductDto: CreateStoreProductDto) {
    const companies = createStoreProductDto.companies.map((company) => {
      return {
        companyId: company.companyId,
        isDeveloper: company.isDeveloper,
        isPublisher: company.isPublisher,
      };
    });

    const genres = createStoreProductDto.genres.map((genre) => {
      return { genreId: genre.genreId };
    });

    const platforms = createStoreProductDto.platforms.map((platform) => {
      return { platformId: platform.platformId };
    });

    const storeProduct = await this.prisma.storeProduct.create({
      data: {
        ...createStoreProductDto,
        companies: { create: companies },
        genres: { create: genres },
        platforms: { create: platforms },
        releaseDate: new Date(createStoreProductDto.releaseDate),
        slug: kebabCase(createStoreProductDto.name),
      },
    });

    return storeProduct;
  }

  async findAll(query: QueryDto) {
    const { q } = query;

    return this.prisma.storeProduct.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        platforms: {
          select: {
            platform: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          {
            platforms: {
              some: {
                platform: { name: { contains: q, mode: 'insensitive' } },
              },
            },
          },
        ],
      },
    });
  }

  async findOne(id: string) {
    const storeProduct = await this.prisma.storeProduct.findUnique({
      where: { id },
      include: {
        companies: { include: { company: true } },
        genres: { include: { genre: true } },
        platforms: { include: { platform: true } },
      },
    });

    if (!storeProduct) {
      throw new NotFoundException('StoreProduct not found');
    }

    return storeProduct;
  }

  async update(id: string, updateStoreProductDto: UpdateStoreProductDto) {
    const oldStoreProduct = await this.findOne(id);

    const diffCompanyIds = this.getDiffIds(
      oldStoreProduct.companies,
      updateStoreProductDto.companies,
      'companyId',
    );

    const diffGenreIds = this.getDiffIds(
      oldStoreProduct.genres,
      updateStoreProductDto.genres,
      'genreId',
    );

    const diffPlatformIds = this.getDiffIds(
      oldStoreProduct.platforms,
      updateStoreProductDto.platforms,
      'platformId',
    );

    const companies = updateStoreProductDto.companies.map((company) => {
      return {
        create: {
          companyId: company.companyId,
          isDeveloper: company.isDeveloper,
          isPublisher: company.isPublisher,
        },
        where: {
          companyId_productId: {
            productId: id,
            companyId: company.companyId,
          },
        },
      };
    });

    const genres = updateStoreProductDto.genres.map((genre) => {
      return {
        create: { genreId: genre.genreId },
        where: {
          genreId_productId: {
            productId: id,
            genreId: genre.genreId,
          },
        },
      };
    });

    const platforms = updateStoreProductDto.platforms.map((platform) => {
      return {
        create: { platformId: platform.platformId },
        where: {
          platformId_productId: {
            productId: id,
            platformId: platform.platformId,
          },
        },
      };
    });

    const storeProduct = await this.prisma.storeProduct.update({
      where: {
        id,
      },
      data: {
        ...updateStoreProductDto,
        companies: { connectOrCreate: companies, deleteMany: diffCompanyIds },
        genres: { connectOrCreate: genres, deleteMany: diffGenreIds },
        platforms: { connectOrCreate: platforms, deleteMany: diffPlatformIds },
        releaseDate: new Date(updateStoreProductDto.releaseDate),
        slug: kebabCase(updateStoreProductDto.name),
      },
    });

    return storeProduct;
  }

  async updateStatus(
    id: string,
    updateStatusStoreProductDto: UpdateStatusStoreProductDto,
  ) {
    const storeProduct = await this.prisma.storeProduct.update({
      where: {
        id,
      },
      data: {
        status: updateStatusStoreProductDto.status,
      },
    });

    return storeProduct;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.storeProduct.delete({
      where: {
        id,
      },
    });

    return;
  }
}
