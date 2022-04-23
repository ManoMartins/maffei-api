import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PlatformService } from './platform.service';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  async create(@Body() createPlatformDto: CreatePlatformDto) {
    return await this.platformService.create(createPlatformDto);
  }

  @Get()
  async findAll() {
    return await this.platformService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.platformService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlatformDto: UpdatePlatformDto,
  ) {
    return await this.platformService.update(id, updatePlatformDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.platformService.remove(id);
  }
}
