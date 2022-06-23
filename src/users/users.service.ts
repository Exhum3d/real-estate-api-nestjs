import { Injectable } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) userRepository: Repository<User>) { }

  findAll(): void {
    console.log("Merge");
  }

}
