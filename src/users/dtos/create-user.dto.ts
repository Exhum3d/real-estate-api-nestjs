import {
  IsAlpha,
  IsEmail,
  IsString,
  MaxLength,
} from "class-validator";
import { RoleEnum } from "../entities/role.enum";

export class CreateUserDto {
  @IsAlpha()
  @MaxLength(30)
  firstName: string;

  @IsAlpha()
  @MaxLength(30)
  lastName: string;

  @IsString()
  @MaxLength(15)
  username: string;

  @IsEmail()
  @MaxLength(30)
  email: string;

  @IsString()
  @MaxLength(30)
  phone: string;

  @IsString()
  @MaxLength(30)
  password: string;

  role: RoleEnum;
}
