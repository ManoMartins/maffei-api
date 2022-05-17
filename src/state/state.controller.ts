import { Controller, Get, Param } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  @IsPublic()
  async findAll() {
    return await this.stateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.stateService.findOne(id);
  }
}
