import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(firstName: string, lastName: string, email: string, phone: string, password: string) {
    const checkEmail = await this.userRepository.findOneBy({ email: email });

    if (checkEmail) {
      throw new BadRequestException('email already exists!');
    }

    const user = this.userRepository.create({ firstName, lastName, email, phone, password });

    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new NotFoundException('user was not found');
    }

    return user;
  }
}
