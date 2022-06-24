import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string) {

    const user = this.userRepository.create({ firstName, lastName, email, phone, password });

    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    if (attrs.email !== undefined && attrs.email !== user.email) {
      throw new BadRequestException(`can't modify email!`)
    }

    Object.assign(user, attrs);

    return this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return this.userRepository.remove(user);
  }
}
