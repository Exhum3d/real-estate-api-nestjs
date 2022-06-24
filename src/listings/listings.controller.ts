import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CreateListingDto } from "./dtos/create-listing.dto";
import { ListingsService } from "./listings.service";

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) { }

  @Post()
  create(@Body() body: CreateListingDto) {
    const listing = this.listingsService.findByTitle(body.title);

    if (listing) {
      throw new BadRequestException('listing already exists!')
    }

    return this.listingsService.create(body);
  }
}
