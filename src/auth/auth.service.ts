import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, email, ...result } = user;

      return result;
    }

    return null;
  }
}
