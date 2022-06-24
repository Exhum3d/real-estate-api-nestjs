import { IsDataURI, IsNumber, IsString, MaxLength } from "class-validator";
import { Column } from "typeorm";

export class StoreImagesDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(150)
  description: string;

  @IsString()
  path: string;
}
