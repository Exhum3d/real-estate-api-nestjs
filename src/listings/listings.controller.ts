import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateListingDto } from "./dtos/create-listing.dto";
import { StoreImagesDto } from "./dtos/store-images.dto";
import { ListingAddress } from "./entities/listing-address.entity";
import { ListingImage } from "./entities/listing-images.entity";
import { Listing } from "./entities/listing.entity";
import { ListingsService } from "./listings.service";

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) { }

  @Post()
  async createListing(@Body() body: CreateListingDto): Promise<Listing & ListingAddress> {
    return this.listingsService.create(body);
  }

  @Post('/:id/images')
  async storeImages(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: StoreImagesDto): Promise<ListingImage> {

    const listing = await this.listingsService.findOneById(id);

    if (!listing) {
      throw new NotFoundException('listing not found!')
    }

    const image = await this.listingsService.storeImages(id, body);

    if (!image) {
      throw new BadRequestException('image could not be saved');
    }

    return image;
  }

  @Get()
  async getAllListings(): Promise<Listing[]> {
    const listings = await this.listingsService.findAll();

    if (!listings) {
      throw new NotFoundException('listings not found!')
    }

    return listings;
  }


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Listing> {
    const listing = await this.listingsService.remove(id);

    if (!listing) {
      throw new NotFoundException('listing not found!')
    }

    return listing;
  }


  @Delete(':listingId/images/:imageId')
  async removeImage(
    @Param('listingId', ParseIntPipe) listingId: number,
    @Param('imageId', ParseIntPipe) imageId: number): Promise<ListingImage> {

    const image = await this.listingsService.findOneImage(listingId, imageId);

    if (!image) {
      throw new NotFoundException('image not found!')
    }

    return this.listingsService.removeImage(image);
  }
}
