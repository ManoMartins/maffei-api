import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserStatus } from './user-status.enum';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  documentNumber: string;

  @IsString()
  gender: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  phoneNumberType: string;

  @IsString()
  birthDate: string;

  @IsEnum(UserStatus)
  @IsOptional()
  status: UserStatus;
}
