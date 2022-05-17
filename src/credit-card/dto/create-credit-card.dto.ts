import { IsString } from 'class-validator';

export class CreateCreditCardDto {
  @IsString()
  cardNumber: string;

  @IsString()
  cardHolder: string;

  @IsString()
  cardExpiry: string;

  @IsString()
  cardCvv: string;

  @IsString()
  documentNumber: string;
}
