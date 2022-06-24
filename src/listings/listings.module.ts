import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListingAddress } from "./entities/listing-address.entity";
import { Listing } from "./entities/listing.entity";
import { ListingsController } from "./listings.controller";
import { ListingsService } from "./listings.service";

@Module({
  imports: [TypeOrmModule.forFeature([Listing, ListingAddress])],
  controllers: [ListingsController],
  providers: [ListingsService]
})
export class ListingsModule { }
