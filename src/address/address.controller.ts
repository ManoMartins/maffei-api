import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @CurrentUser() user: User,
  ) {
    return await this.addressService.create(createAddressDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.addressService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.addressService.findOne(id, user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, user.id, updateAddressDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.addressService.remove(id, user.id);
  }
}
