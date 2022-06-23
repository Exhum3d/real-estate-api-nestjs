import { BadRequestException, Injectable } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  createUser(firstName: string, lastName: string, email: string, phone: string, password: string) {
    const user = this.userRepository.create({ firstName, lastName, email, phone, password });

    if (!user) {
      return new BadRequestException('wrong user details')
    }

    return this.userRepository.save(user);
  }
}
