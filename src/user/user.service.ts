import { NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const emailAlreadyExists = await this.findByEmail(createUserDto.email);

    if (emailAlreadyExists) {
      throw new NotFoundException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const user = {
      ...createUserDto,
      password: passwordHash,
    };

    const createdUser = await this.prisma.user.create({
      data: user,
    });

    return { ...createdUser, password: undefined };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users.map((user) => ({ ...user, password: undefined }));
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { ...user, password: undefined };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });

    return { ...updatedUser, password: undefined };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.user.delete({ where: { id } });

    return;
  }
}
