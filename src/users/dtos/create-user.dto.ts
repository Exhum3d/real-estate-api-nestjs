import { IsAlpha, IsEmail, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsAlpha()
  @MaxLength(30)
  firstName: string;

  @IsAlpha()
  @MaxLength(30)
  lastName: string;

  @IsEmail()
  @MaxLength(30)
  email: string;

  @IsString()
  @MaxLength(30)
  phone: string;

  @IsString()
  @MaxLength(30)
  password: string;
}
