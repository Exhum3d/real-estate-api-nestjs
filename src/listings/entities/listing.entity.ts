import { IsBoolean, IsCurrency, IsString, MaxLength } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ListingAddress } from "./listing-address.entity";

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

  @IsCurrency()
  @Column()
  price: number;

  @IsBoolean()
  @Column('boolean', { default: false })
  isRentable: boolean;

  // Setting up Bi-Directional One-To-One relationship
  @OneToOne(() => ListingAddress, listingAddress => listingAddress.listing)
  listingAddress: ListingAddress;

  @ManyToOne(() => User, user => user.listings, { cascade: true })
  user: User

}
