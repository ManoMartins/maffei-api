import { NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StateService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const states = await this.prisma.state.findMany();

    return states;
  }

  async findOne(id: string) {
    const state = await this.prisma.state.findUnique({ where: { id } });

    if (!state) {
      throw new NotFoundException('State not found');
    }

    return state;
  }
}
