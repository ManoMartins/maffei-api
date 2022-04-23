import { kebabCase } from 'lodash';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createGenreDto: CreateGenreDto) {
    return await this.prisma.genre.create({
      data: { ...createGenreDto, slug: kebabCase(createGenreDto.name) },
    });
  }

  async findAll() {
    return await this.prisma.genre.findMany();
  }

  async findOne(id: string) {
    const genre = await this.prisma.genre.findFirst({
      where: { id },
    });

    return genre;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    await this.findOne(id);

    return await this.prisma.genre.update({
      where: { id },
      data: { ...updateGenreDto, slug: kebabCase(updateGenreDto.name) },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.genre.delete({
      where: { id },
    });

    return;
  }
}
