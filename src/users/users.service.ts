import { Injectable } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  createUser(firstName: string, lastName: string, email: string, phone: string, password: string) {
    const user = this.userRepository.create({ email, firstName, lastName, phone, password });

    return this.userRepository.save(user);
  }
}
