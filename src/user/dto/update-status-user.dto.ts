import { IsEnum } from 'class-validator';
import { UserStatus } from './user-status.enum';

export class UpdateStatusUserDto {
  @IsEnum(UserStatus)
  status: UserStatus;
}
