import { IsBoolean, IsNumber, IsString, MaxLength, ValidateNested } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ListingAddress } from "./listing-address.entity";
import { ListingImage } from "./listing-images.entity";

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MaxLength(100)
  @Column()
  title: string;

  @IsString()
  @MaxLength(500)
  @Column()
  description: string;

  @IsNumber()
  @Column()
  price: number;

  @IsBoolean()
  @Column('boolean', { default: false })
  isRentable: boolean;


  @ValidateNested()
  @OneToOne(() => ListingAddress, listingAddress => listingAddress.listing, { cascade: true })
  listingAddress: ListingAddress;

  @OneToMany(() => ListingImage, listingImage => listingImage.listing, { cascade: true })
  listingImage: ListingImage[];
}
