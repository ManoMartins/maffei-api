import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';

@Injectable()
export class CreditCardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCreditCardDto: CreateCreditCardDto, userId: string) {
    const createdCreditCard = await this.prisma.creditCard.create({
      data: {
        ...createCreditCardDto,
        userId,
      },
    });

    return createdCreditCard;
  }

  async findAll(userId: string) {
    const creditCards = await this.prisma.creditCard.findMany({
      where: {
        userId,
      },
    });

    return creditCards;
  }

  async findOne(id: string, userId: string) {
    const creditCard = await this.prisma.creditCard.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!creditCard) {
      throw new NotFoundException(`CreditCard with id ${id} not found`);
    }

    return creditCard;
  }

  async update(
    id: string,
    userId: string,
    updateCreditCardDto: UpdateCreditCardDto,
  ) {
    await this.findOne(id, userId);

    const updatedCreditCard = await this.prisma.creditCard.update({
      where: {
        id,
      },
      data: {
        ...updateCreditCardDto,
      },
    });

    return updatedCreditCard;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.creditCard.delete({
      where: {
        id,
      },
    });

    return;
  }
}
