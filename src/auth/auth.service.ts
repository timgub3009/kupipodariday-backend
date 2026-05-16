import { Injectable } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> | null {
    const user = await this.usersService.getUserByName(username);
    const isPasswordCorrect = await this.hashService.compare(
      password,
      user.password,
    );

    if (user && isPasswordCorrect) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }
}
