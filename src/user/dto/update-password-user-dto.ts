import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordUserDto {
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  oldPassword: string;
}
