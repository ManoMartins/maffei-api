import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  documentNumber: string;

  @IsString()
  gender: string;

  @IsNumber()
  @IsOptional()
  ranking?: number;

  @IsString()
  phoneNumber: string;

  @IsString()
  phoneNumberType: string;

  @IsString()
  birthDate: string;
}
