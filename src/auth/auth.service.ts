import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(loginOrEmail: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUser(loginOrEmail, pass)
    if (user) return user
    return null;
  }
  async login(user: any) {
    const payload = {  sub: user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}