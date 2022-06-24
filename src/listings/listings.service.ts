import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateListingDto } from "./dtos/create-listing.dto";
import { ListingAddress } from "./entities/listing-address.entity";
import { Listing } from "./entities/listing.entity";

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing) private listingsRepository: Repository<Listing>,
    @InjectRepository(ListingAddress) private listingAddressRepository: Repository<ListingAddress>,

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

  async findByTitle(title: string) {
    return this.listingsRepository.findBy({ title: title });
  }

  async remove(id: number) {

    const listing = await this.listingsRepository.findOneBy({ id: id });

    if (!listing) {
      throw new NotFoundException('listing not found!')
    }

    return this.listingsRepository.remove(listing);

  }

}
