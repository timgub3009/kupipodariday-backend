import { Injectable } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { SignupUserResponseDto } from './dto/signup-user-response.dto';

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

  async login(user: User) {}

  async signup(createUserDto: CreateUserDto): Promise<SignupUserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    const { password, ...rest } = user;
    return rest;
  }
}
