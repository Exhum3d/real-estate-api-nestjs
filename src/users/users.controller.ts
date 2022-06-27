import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { RoleEnum } from "./entities/role.enum";
import { User } from "./entities/user.entity";
import { Roles } from "./roles.decorator";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('signup')
  async signup(@Body() body: CreateUserDto): Promise<User> {
    let user = await this.usersService.findByUsername(body.username);

    if (user && user.username === body.username) {
      throw new BadRequestException('username already exists!');
    }

    user = await this.usersService.findByEmail(body.email);

    if (user && user.email === body.email) {
      throw new BadRequestException('email is already taken!')
    }

    return this.usersService.create(body);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user;

  }

  @Patch('myprofile')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Request() req: any, @Body() body: UpdateUserDto): Promise<User> {
    let user = await this.usersService.findOne(req.user.id);

    console.log(req)
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    user = await this.usersService.findByEmail(req.user.email);

    if (user && user.email === body.email) {
      throw new BadRequestException('email already exists');
    }

    return this.usersService.update(req.user.id, body);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.delete(id);
  }
}
