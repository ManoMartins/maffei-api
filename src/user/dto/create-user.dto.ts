import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { User } from '../entities/user.entity';
import { UserStatus } from './user-status.enum';

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

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}
