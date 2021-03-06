import { Company } from 'src/company/entities/company.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Platform } from 'src/platform/entities/platform.entity';

export enum ProductStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export class StoreProduct {
  name: string;
  status?: ProductStatus;
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
