import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { type AuthService } from '../auth.service';
import { Ru } from 'src/shared';
import { type UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';
import { type SigninUserDto } from '../dto/signin-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate({
    username,
    password,
  }: SigninUserDto): Promise<UserProfileResponseDto> {
    const user = await this.authService.validateUser({ username, password });

    if (!user) {
      throw new UnauthorizedException(Ru.AUTH_FAILED);
    }

    return user;
  }
}
