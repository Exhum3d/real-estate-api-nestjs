import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body.firstName, body.lastName, body.email, body.phone, body.password)
  }

}
