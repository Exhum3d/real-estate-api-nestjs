import { IsString, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from "./listing.entity";

@Entity()
export class ListingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MaxLength(50)
  @Column()
  city: string;

  @IsString()
  @MaxLength(100)
  @Column()
  streetName: string;

  @IsString()
  @MaxLength(5)
  @Column()
  streetNumber: string


  @IsString()
  @MaxLength(7)
  @Column()
  zipCode: string;

  @IsString()
  @MaxLength(50)
  @Column()
  country: string;

  @OneToOne(() => Listing, listing => listing.listingAddress, { cascade: true })
  @JoinColumn()
  listing: Listing
}
