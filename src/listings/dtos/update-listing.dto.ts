import { IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { ListingImage } from "../entities/listing-images.entity";

export class UpdateListingDto {

  @IsString()
  @MaxLength(50)
  @IsOptional()
  title: string;

  @IsString()
  @MaxLength(150)
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  city: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  streetName: string;

  @IsString()
  @MaxLength(5)
  @IsOptional()
  streetNumber: string;

  @IsString()
  @MaxLength(5)
  @IsOptional()
  zipCode: string;

  @IsString()
  @MaxLength(25)
  @IsOptional()
  country: string
}
