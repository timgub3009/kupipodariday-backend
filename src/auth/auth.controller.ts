import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { type AuthService } from './auth.service';
import { type CreateUserDto } from 'src/users/dto/create-user.dto';
import { type SignupUserResponseDto } from './dto/signup-user-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { type Request } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserResponseDto> {
    return await this.authService.signup(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signin(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
