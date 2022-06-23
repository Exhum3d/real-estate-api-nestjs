import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const emailFound = await this.usersService.findByEmail(body.email);
    console.log(emailFound)

    if (emailFound) {
      throw new BadRequestException('email already exists!');
    }

    return this.usersService.create(body.firstName, body.lastName, body.email, body.phone, body.password);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);

    console.log(`userul este: ${user}`);
    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user;

  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return this.usersService.update(user, body);
  }

}
