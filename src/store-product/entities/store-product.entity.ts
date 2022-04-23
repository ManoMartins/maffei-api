import { Company } from 'src/company/entities/company.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Platform } from 'src/platform/entities/platform.entity';

export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
}

export class StoreProduct {
  name: string;
  status: ProductStatus;
  releaseDate: Date;
  summary: string;
  storyline: string;
  stock: number;
  price: number;
  genres: Genre[];
  platforms: Platform[];
  companies: Company[];
  slug: string;
}
