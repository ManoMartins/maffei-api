import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('session')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  session(@Request() req: AuthRequest) {
    return this.authService.session(req.user);
  }
}
