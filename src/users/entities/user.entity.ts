import { Exclude } from "class-transformer";
import { IsBoolean, IsEmail, IsString, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { RoleEnum } from "./role.enum";

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MaxLength(30)
  @Column()
  firstName: string;

  @IsString()
  @MaxLength(30)
  @Column()
  lastName: string;

  @IsString()
  @MaxLength(15)
  @Column()
  username: string;

  @IsEmail()
  @Column()
  email: string;


  @IsString()
  @MaxLength(30)
  @Column()
  phone: string;

  @IsString()
  @Column()
  @Exclude()
  password: string;

  @IsBoolean()
  @Column('boolean', { default: false })
  isAdmin: boolean;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER
  })
  role: RoleEnum;
  // @OneToMany(() => Listing, listing => listing.user)
  // listings: Listing[]
}
