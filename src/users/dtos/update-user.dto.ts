import {
  IsAlpha,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";

export class UpdateUserDto {
  @IsAlpha()
  @MaxLength(30)
  @IsOptional()
  firstName: string;

  @IsAlpha()
  @MaxLength(30)
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  phone: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  password: string;
}
