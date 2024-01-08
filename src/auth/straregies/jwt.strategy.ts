import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    },);
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.sub)
    if(!user) return null
    return { userId: payload.sub, login: user.login };
  }
}