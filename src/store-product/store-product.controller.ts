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
  Patch,
} from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { ProductStatus } from './entities/store-product.entity';
import { UpdateStatusStoreProductDto } from './dto/update-status-store-product-dto';

@Controller('store-product')
export class StoreProductController {
  constructor(private readonly storeProductService: StoreProductService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createStoreProductDto: CreateStoreProductDto) {
    return await this.storeProductService.create(createStoreProductDto);
  }

  @Get()
  async findAll() {
    return await this.storeProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.storeProductService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStoreProductDto: UpdateStoreProductDto,
  ) {
    return await this.storeProductService.update(id, updateStoreProductDto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusStoreProductDto: UpdateStatusStoreProductDto,
  ) {
    return await this.storeProductService.updateStatus(
      id,
      updateStatusStoreProductDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.storeProductService.remove(id);
  }
}
