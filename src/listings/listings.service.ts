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

  async create({
    title,
    description,
    price,
    city,
    streetNumber,
    streetName,
    country,
    zipCode
  }: CreateListingDto): Promise<Listing & ListingAddress> {

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

  async findAll(): Promise<Listing[]> {
    const listings = await this.listingsRepository.find({ relations: ['listingAddress'] });

    listings.forEach(e => delete (e.listingAddress.listingId));

    return listings;
  }

  async findOneById(id: number): Promise<Listing> {
    const listing = await this.listingsRepository.findOne({ where: { id: id }, relations: ['listingAddress'] });

    delete (listing.listingAddress.listingId);

    return listing;
  }

  async findOneImage(listingId: number, imageId: number): Promise<ListingImage> {
    return this.listingImagesRepository.findOne({ where: { id: imageId, listingId: listingId } })
  }

  async remove(id: number): Promise<Listing> {
    const listing = await this.listingsRepository.findOneBy({ id: id });

    return this.listingsRepository.remove(listing);
  }

  async storeImages(id: number, { title, description, path }: StoreImagesDto): Promise<ListingImage> {
    const createdImage = this.listingImagesRepository.create({ title, description, path, listingId: id })

    return this.listingImagesRepository.save(createdImage);
  }

  async removeImage(image: ListingImage): Promise<ListingImage> {
    return this.listingImagesRepository.remove(image);
  }
}
