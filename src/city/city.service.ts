import { NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const cities = await this.prisma.city.findMany();

    return cities;
  }

  async findOne(id: string) {
    const city = await this.prisma.city.findUnique({ where: { id } });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    return city;
  }
}
