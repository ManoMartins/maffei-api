import { IsString } from 'class-validator';

export class CreatePlatformDto {
  @IsString()
  name: string;

  @IsString()
  generation: string;

  @IsString()
  abbreviation: string;

  @IsString()
  summary: string;
}
