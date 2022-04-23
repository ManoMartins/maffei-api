import { kebabCase } from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';

@Injectable()
export class PlatformService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlatformDto: CreatePlatformDto) {
    return await this.prisma.platform.create({
      data: { ...createPlatformDto, slug: kebabCase(createPlatformDto.name) },
    });
  }

  async findAll() {
    return await this.prisma.platform.findMany();
  }

  async findOne(id: string) {
    const platform = await this.prisma.platform.findFirst({
      where: { id },
    });

    if (!platform) {
      throw new NotFoundException('Platform not found');
    }

    return platform;
  }

  async update(id: string, updatePlatformDto: UpdatePlatformDto) {
    await this.findOne(id);

    return await this.prisma.platform.update({
      where: { id },
      data: { ...updatePlatformDto, slug: kebabCase(updatePlatformDto.name) },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.platform.delete({
      where: { id },
    });

    return;
  }
}
