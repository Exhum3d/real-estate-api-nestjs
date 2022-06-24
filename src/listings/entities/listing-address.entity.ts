import { IsString, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
