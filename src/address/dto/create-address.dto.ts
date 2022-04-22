import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsString()
  streetType: string;

  @IsString()
  number: string;

  @IsString()
  @IsOptional()
  complement: string;

  @IsString()
  neighborhood: string;

  @IsString()
  zipCode: string;

  @IsString()
  cityId: string;

  @IsString()
  stateId: string;
}
