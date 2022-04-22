import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(email: string, password: string): any {
    throw new Error('Method not implemented.');
  }
  async session(user) {
    return {
      user,
      token: 'fake-jwt-token',
    };
  }
}
