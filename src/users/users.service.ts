import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dtos/update-user.dto";
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
    return this.userRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  async update(user: UpdateUserDto, attrs: Partial<User>) {
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
