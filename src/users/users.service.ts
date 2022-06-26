import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create({ firstName,
    lastName,
    email,
    username,
    phone,
    password }): Promise<User> {

    const user = this.userRepository.create({ firstName, lastName, email, username, phone, password });

    return this.userRepository.save(user);
  }


  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOneBy({ username: username });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
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
