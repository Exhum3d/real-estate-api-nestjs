import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListingAddress } from "./entities/listing-address.entity";
import { ListingImage } from "./entities/listing-images.entity";
import { Listing } from "./entities/listing.entity";
import { ListingsController } from "./listings.controller";
import { ListingsService } from "./listings.service";

@Module({
  imports: [TypeOrmModule.forFeature([
    Listing,
    ListingAddress,
    ListingImage
  ])],
  controllers: [ListingsController],
  providers: [ListingsService]
})
export class ListingsModule { }
