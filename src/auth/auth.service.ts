import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDtoType, CreatedUserDtoDbType, User } from '../users/user.schema';
import { mailManager } from '../common/managers/mail-manager';
import { authHelper } from './authHelper';
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
  async registerUser(data: CreateUserDtoType):Promise<boolean>{
    const existUser = await this.usersService.checkExistUser(data.email, data.login)
    if(existUser) return false
    const confirmationData = authHelper.confiramtionDataMapper()
     await this.usersService.createUser(data, confirmationData)
     await mailManager.registerConfirmation(data.email, confirmationData.code)
    return true
}
}