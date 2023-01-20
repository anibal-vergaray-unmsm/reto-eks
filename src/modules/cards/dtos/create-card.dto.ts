import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Matches, Max, MaxLength, Min, ValidateIf } from 'class-validator';
import { IsValidMonth } from 'src/core/decorators/validation/IsValidMonth';
import { IsValidCardNumber } from 'src/core/decorators/validation/IsValidCardNumber';
import { IsValidExpirationYear } from 'src/core/decorators/validation/IsValidExpirationYear';
import { IsAllowedDomain } from 'src/core/decorators/validation/IsAllowedDomain';
import { IsValidCVVOf } from 'src/core/decorators/validation/IsValidCVV';
import { luhnValidator } from 'src/core/utils/luhn';

export class CreateCardDTO {
  @IsValidCardNumber()
  @IsNumberString()
  @Length(13, 16)
  @IsNotEmpty()
    card_number: string;

  @IsValidCVVOf('card_number')
  @IsNumberString()
  @IsNotEmpty()
    cvv: string;

  @IsValidMonth()
  @Length(1, 2)
  @IsNumberString()
  @IsNotEmpty()
    expiration_month: string;
  
  @IsValidExpirationYear()
  @Length(4, 4)
  @IsNumberString()
  @IsNotEmpty()
    expiration_year: string;

  @IsAllowedDomain(['gmail.com','hotmail.com','yahoo.es'])
  @IsEmail()
  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
    email: string;
}
