import { IsString } from 'class-validator';

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
}
