import { IsCurrency, IsString, MaxLength, ValidateNested } from "class-validator";
import { Column } from "typeorm";
import { ListingAddress } from "../entities/listing-address.entity";

export class CreateListingDto {
  @IsString()
  @MaxLength(100)
  @Column()
  title: string;

  @IsString()
  @MaxLength(500)
  @Column()
  description: string;

  @IsCurrency()
  @Column()
  price: number;

  @ValidateNested()
  address: ListingAddress;
}
