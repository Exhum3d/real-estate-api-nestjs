import { IsAlpha, IsEmail, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsAlpha()
  @Min(2)
  @Max(30)
  firstName: string;

  @IsString()
  @IsAlpha()
  @Min(2)
  @Max(30)
  lastName: string;

  @IsEmail()
  @Max(50)
  email: string;

  @IsString()
  @Max(13)
  phone: string;

  @IsString()
  password: string;

}
