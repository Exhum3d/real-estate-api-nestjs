import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateListingDto } from "./dtos/create-listing.dto";
import { StoreImagesDto } from "./dtos/store-images.dto";
import { ListingAddress } from "./entities/listing-address.entity";
import { ListingImage } from "./entities/listing-images.entity";
import { Listing } from "./entities/listing.entity";

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing) private listingsRepository: Repository<Listing>,
    @InjectRepository(ListingAddress) private listingAddressRepository: Repository<ListingAddress>,
    @InjectRepository(ListingImage) private listingImagesRepository: Repository<ListingImage>,

  ) { }

  async create({ title, description, price, city, streetNumber, streetName, country, zipCode }: CreateListingDto) {
    const listingToValidate = await this.listingsRepository.findOneBy({ title: title });

    if (listingToValidate) {
      throw new BadRequestException(`cannot duplicate listing's title`);
    }

    const listing = this.listingsRepository.create({ title, description, price });
    await this.listingsRepository.save(listing);

    const savedListing = await this.listingsRepository.findOneBy({ title: title });

    if (!savedListing) {
      throw new NotFoundException('something went wrong during the saving of listing details');
    }

    const listingAddress = this.listingAddressRepository.create({ listingId: savedListing.id, city, streetName, streetNumber, country, zipCode });
    await this.listingAddressRepository.save(listingAddress);

    delete (listingAddress.id)
    delete (savedListing.id)
    delete (listingAddress.listingId)

    return Object.assign(savedListing, listingAddress);
  }

  async remove(id: number) {
    const listing = await this.listingsRepository.findOneBy({ id: id });

    if (!listing) {
      throw new NotFoundException('listing not found!')
    }

    return this.listingsRepository.remove(listing);

  }

  async storeImages(id: number, { title, description, path }: StoreImagesDto) {
    const listing = await this.listingsRepository.findOneBy({ id: id });

    if (!listing) {
      throw new NotFoundException('listing not found!')
    }

    const createdImage = this.listingImagesRepository.create({ title, description, path, listingId: id })

    if (!createdImage) {
      throw new BadRequestException('image could not be saved');
    }

    return this.listingImagesRepository.save(createdImage);
  }

}
