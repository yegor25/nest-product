import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDtoType, CreatedUserDtoDbType, User } from '../users/user.schema';
import { mailManager } from '../common/managers/mail-manager';
import { authHelper } from './authHelper';
import { UserRepository } from '../users/user.repository';
import { jwtConstants } from './constants';
import { CreateSuDtoType } from '../super-users/su.schema';
import { DataConfirmationRepository } from 'src/users/dataConfirmation.repository';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private dataConfirmationRepository: DataConfirmationRepository
    ) {}

  async validateUser(loginOrEmail: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUser(loginOrEmail, pass)
    if (user) return user
    return null;
  }
  async login(userId: string,deviceId: string):Promise<{accessToken: string;
    refreshToken: string;}> {
    const payload = {
        sub: userId
    }
    const data = {
      accessToken:  this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign({...payload, deviceId:deviceId}, {secret: jwtConstants.refreshSecret, expiresIn: "20s"})
    }
    return data
  }
  async registerUser(data: CreateSuDtoType):Promise<any>{
    // const confirmationData = authHelper.confiramtionDataMapper()
    //  await this.usersService.createUser(data, confirmationData)
    //  await mailManager.registerConfirmation(data.email, confirmationData.code)
    return this.usersService.createUser(data)
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
    await this.dataConfirmationRepository.changeCode(confirmationData,email)
    return
}
}