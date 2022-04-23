import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductStatus } from '../entities/store-product.entity';

class Company {
  @IsString()
  companyId: string;

  @IsBoolean()
  isDeveloper: boolean;

  @IsBoolean()
  isPublisher: boolean;
}

class Genre {
  @IsString()
  genreId: string;
}

class Platform {
  @IsString()
  platformId: string;
}

export class CreateStoreProductDto {
  @IsString()
  name: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsString()
  releaseDate: string;

  @IsString()
  summary: string;

  @IsString()
  storyline: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Genre)
  genres: Genre[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Platform)
  platforms: Platform[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Company)
  companies: Company[];
}
