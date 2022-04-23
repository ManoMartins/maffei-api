import { kebabCase } from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { ProductStatus } from './entities/store-product.entity';
import { UpdateStatusStoreProductDto } from './dto/update-status-store-product-dto';

@Injectable()
export class StoreProductService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findAll() {
    return this.prisma.storeProduct.findMany({
      select: {
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
    });
  }

  findOne(id: string) {
    const storeProduct = this.prisma.storeProduct.findMany({
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
    const companies = updateStoreProductDto.companies.map((company) => {
      return {
        companyId: company.companyId,
        isDeveloper: company.isDeveloper,
        isPublisher: company.isPublisher,
      };
    });

    const genres = updateStoreProductDto.genres.map((genre) => {
      return { genreId: genre.genreId };
    });

    const platforms = updateStoreProductDto.platforms.map((platform) => {
      return { platformId: platform.platformId };
    });

    const storeProduct = await this.prisma.storeProduct.update({
      where: {
        id,
      },
      data: {
        ...updateStoreProductDto,
        companies: { create: companies },
        genres: { create: genres },
        platforms: { create: platforms },
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
