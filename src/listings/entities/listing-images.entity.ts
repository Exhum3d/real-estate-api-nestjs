import { IsDataURI, IsNumber, IsString, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from "./listing.entity";


@Entity()
export class ListingImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(150)
  @Column()
  description: string;

  @Column()
  @IsString()
  path: string;

  @IsNumber()
  @Column()
  listingId: number

  @ManyToOne(() => Listing, listing => listing.listingImage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listingId' })
  listing: Listing;
}
