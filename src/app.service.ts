import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUser(user: User): Promise<User> {
    const me = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    return { ...me, password: undefined };
  }
}
