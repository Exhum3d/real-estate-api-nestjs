import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateListingDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  city: string;

  @IsString()
  @MaxLength(5)
  streetNumber: string;

  @IsString()
  streetName: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;
}
