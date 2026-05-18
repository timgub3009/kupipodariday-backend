import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { type UsersService } from 'src/users/users.service';
import { type JwtPayload } from '../auth.interfaces';
import { UnauthorizedException } from '@nestjs/common';
import { type SignupUserResponseDto } from '../dto/signup-user-response.dto';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    } as StrategyOptions);
  }

  async validate(payload: JwtPayload): Promise<SignupUserResponseDto> {
    const user = await this.usersService.findOne({ id: payload.sub });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
