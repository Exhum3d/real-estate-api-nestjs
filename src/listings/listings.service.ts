import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateListingDto } from "./dtos/create-listing.dto";
import { Listing } from "./entities/listing.entity";

@Injectable()
export class ListingsService {
  constructor(@InjectRepository(Listing) private listingsRepository: Repository<Listing>) { }

  async create({ title,
    description,
    price,
    address: {
      streetName,
      streetNumber,
      city,
      country,
      zipCode
    }
  }: CreateListingDto) {
    const listing = this.listingsRepository.create({
      title,
      description,
      price,
      listingAddress: {
        streetNumber,
        streetName,
        city,
        country,
        zipCode
      }
    });

    return this.listingsRepository.save(listing);
  }

  findByTitle(title: string) {
    return this.listingsRepository.findBy({ title: title });
  }

}
