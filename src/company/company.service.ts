import { Injectable, NotFoundException } from '@nestjs/common';
import { kebabCase } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCompanyDto: CreateCompanyDto) {
    return await this.prisma.company.create({
      data: { ...createCompanyDto, slug: kebabCase(createCompanyDto.name) },
    });
  }

  async findAll() {
    return await this.prisma.company.findMany();
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findFirst({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    await this.findOne(id);

    return await this.prisma.company.update({
      where: { id },
      data: { ...updateCompanyDto, slug: kebabCase(updateCompanyDto.name) },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.company.delete({
      where: { id },
    });

    return;
  }
}
