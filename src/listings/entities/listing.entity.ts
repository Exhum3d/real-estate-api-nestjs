import { IsBoolean, IsCurrency, IsString, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
