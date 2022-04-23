import { IsEnum } from 'class-validator';
import { ProductStatus } from '../entities/store-product.entity';

export class UpdateStatusStoreProductDto {
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
