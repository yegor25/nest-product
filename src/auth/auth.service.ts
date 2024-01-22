import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDtoType, CreatedUserDtoDbType, User } from '../users/user.schema';
import { mailManager } from '../common/managers/mail-manager';
import { authHelper } from './authHelper';
import { UserRepository } from 'src/users/user.repository';
import { jwtConstants } from './constants';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private userRepository: UserRepository
    ) {}

  async validateUser(loginOrEmail: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUser(loginOrEmail, pass)
    if (user) return user
    return null;
  }
  async login(userId: string):Promise<{accessToken: string;
    refreshToken: string;}> {
    const payload = {
        sub: userId
    }
    const data = {
      accessToken:  this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {secret: jwtConstants.refreshSecret, expiresIn: "2h"})
    }
    return data
  }
  async registerUser(data: CreateUserDtoType):Promise<any>{
    const confirmationData = authHelper.confiramtionDataMapper()
     await this.usersService.createUser(data, confirmationData)
     await mailManager.registerConfirmation(data.email, confirmationData.code)
    return 
}
async confirmUser(code: string):Promise<boolean>{
    const res = await this.usersService.checkCodeConfirmation(code)
    return res
}
async resendingEmail(email: string){
    const confirmationData = authHelper.confiramtionDataMapper()
    // const modified = await this.usersService.changeConfirmationData(email, confirmationData)
    // if(!modified) return null
    await mailManager.registerConfirmation(email,confirmationData.code)
    await this.userRepository.changeConfirmationData(email, confirmationData)
    return
}
}