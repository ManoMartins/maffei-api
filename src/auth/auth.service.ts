import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { IUserPayload } from './models/IUserPayload';
import { JwtService } from '@nestjs/jwt';
import { IUserToken } from './models/IUserToken';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  session(user: User): IUserToken {
    const payload: IUserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
      id: user.id,
      name: user.name,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error('Email or password is incorrect');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Error('Email or password is incorrect');
    }

    return {
      ...user,
      password: undefined,
    };
  }
}
