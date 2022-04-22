import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAddressDto: CreateAddressDto, userId: string) {
    const createdAddress = this.prisma.address.create({
      data: {
        ...createAddressDto,
        userId,
      },
    });

    return createdAddress;
  }

  async findAll(userId: string) {
    const addresses = await this.prisma.address.findMany({
      where: {
        userId,
      },
    });

    return addresses;
  }

  async findOne(id: string, userId: string) {
    const address = await this.prisma.address.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }

    return address;
  }

  async update(id: string, userId: string, updateAddressDto: UpdateAddressDto) {
    await this.findOne(id, userId);

    const updatedAddress = this.prisma.address.update({
      where: {
        id,
      },
      data: {
        ...updateAddressDto,
      },
    });

    return updatedAddress;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.address.delete({
      where: {
        id,
      },
    });

    return;
  }
}
