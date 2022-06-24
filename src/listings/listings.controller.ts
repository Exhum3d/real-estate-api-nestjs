import { BadRequestException, Body, Controller, Delete, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateListingDto } from "./dtos/create-listing.dto";
import { ListingsService } from "./listings.service";

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) { }

  @Post()
  async create(@Body() body: CreateListingDto) {
    return this.listingsService.create(body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.listingsService.remove(id);
  }
}
