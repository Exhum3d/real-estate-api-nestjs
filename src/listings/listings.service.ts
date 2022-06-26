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
  }: CreateListingDto): Promise<Listing> {

    const listing = this.listingsRepository.create({
      title,
      description,
      price,
      listingAddress: {
        city,
        streetNumber,
        streetName,
        zipCode,
        country
      }
    });

    return this.listingsRepository.save(listing);
  }

  async findAll(): Promise<Listing[]> {
    return this.listingsRepository.find({ relations: ['listingAddress'] });
  }

  async findOneById(id: number): Promise<Listing> {
    return this.listingsRepository.findOne({ where: { id: id }, relations: ['listingAddress'] });
  }

  async findOneByTitle(title: string): Promise<Listing> {
    const listing = await this.listingsRepository.findOne({ where: { title: title }, relations: ['listingAddress'] });

    return listing;
  }

  async findOneImage(listingId: number, imageId: number): Promise<ListingImage> {
    return this.listingImagesRepository.findOne({ where: { id: imageId, listingId: listingId } })
  }

  async updateListing(id: number, attrs: Partial<Listing>): Promise<Listing> {
    const listing = await this.listingsRepository.findOne({ where: { id: id }, relations: ['listingAddress'] });

    const { title, description, price, ...listingAddress } = attrs;

    Object.assign(listing.listingAddress, listingAddress);
    Object.assign(listing, { title, description, price });

    return this.listingsRepository.save(listing);
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
