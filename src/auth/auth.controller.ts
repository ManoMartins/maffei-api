import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('session')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async session(@Body() user) {
    return this.authService.session(user);
  }
}
