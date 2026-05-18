import { Injectable } from '@nestjs/common';
import { type HashService } from 'src/hash/hash.service';
import { type CreateUserDto } from 'src/users/dto/create-user.dto';
import { type UsersService } from 'src/users/users.service';
import { type SignupUserResponseDto } from './dto/signup-user-response.dto';
import { type JwtService } from '@nestjs/jwt';
import { type SigninUserResponseDto } from './dto/signin-user-response.dto';
import { type JwtPayload } from './auth.interfaces';
import { type UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    username,
    password,
  }: SigninUserDto): Promise<UserProfileResponseDto> | null {
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

  login(user: UserProfileResponseDto): SigninUserResponseDto {
    const payload: JwtPayload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async signup(createUserDto: CreateUserDto): Promise<SignupUserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    const { password, ...rest } = user;
    return rest;
  }
}
