import { IsAlpha, IsString, Max, Min } from "class-validator";
import { Contact } from "../entities/contact.entity";

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

  @IsString()
  password: string;

  email: CreateUserEmailDto;

  phone: CreateUserPhoneDto;
}
