import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.firstName, body.lastName, body.email, body.phone, body.password)
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

}
