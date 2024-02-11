import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

import { userHelper } from './user.helper';
import { CreateUserDtoType, ResponseUserDtoType, paramsUserPaginatorType, ResponseAllUserDto, User, CreatedUserDtoDbType, EmailConfirmation, userSqlDbType, confirmationDataType } from './user.schema';
import { cryptoService } from '../common/crypto.service';
import { SuperUsersService } from '../super-users/superUsers.service';
import { UserSqlRepository } from './userSql.repository';
import { mailManager } from 'src/common/managers/mail-manager';
import { DataConfirmationRepository } from './dataConfirmation.repository';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    protected userRepository: UserRepository,
    protected suService: SuperUsersService,
    protected userSqlRepository: UserSqlRepository,
    protected confirmationDataRepository: DataConfirmationRepository
    ) {}
  async createUser(
    createUserDto: CreateUserDtoType,
  ) {
    const hash = await cryptoService.genHash(createUserDto.password)
    const dtoUser:CreatedUserDtoDbType ={
      passwordSalt:  hash.salt,
      hashPassword: hash.hash,
      login: createUserDto.login,
      email: createUserDto.email,

    }
    
    const newUser = await this.userSqlRepository.registerUser(dtoUser);
   const confirmData =  await this.confirmationDataRepository.save(v4(),newUser)
    await mailManager.registerConfirmation(dtoUser.email,confirmData)
    return
    
  }
  async findUsers(
    params: paramsUserPaginatorType,
  ): Promise<ResponseAllUserDto> {
    return this.suService.findAll(params)
    // return this.userRepository.findUsers(params);
  }

  async findById(id: string):Promise< userSqlDbType | null>{
    // return this.userRepository.findById(id)
    return this.userSqlRepository.findById(id)
  }
  async deleteUser(id: string): Promise<boolean> {
    // return this.userRepository.delete(id);
    return this.suService.deleteUser(id)
  }
  async validateUser(loginOrEmail: string, pass: string):Promise<userSqlDbType | null> {
    // return this.userRepository.validateUser(loginOrEmail, pass)
    return this.userSqlRepository.validate(loginOrEmail,pass)
  }
  async checkExistUser(email: string, login: string):Promise<User | null>{
    return this.userRepository.checkExistUser(email, login)
  }
  async checkCodeConfirmation(code: string):Promise<boolean>{
    // return this.userRepository.checkCodeConfirmation(code)
    const user = await this.userSqlRepository.checkCodeConfirmation(code)
    if(user.userId && !user.isActiveAccount && user.expirationDate >= new Date()){
      const activateUser = this.userSqlRepository.activateAccount(user.userId)
      return true
    }
    return false
}
// async changeConfirmationData(email: string, data: EmailConfirmation):Promise<string | null>{
//   return this.userRepository.changeConfirmationData(email, data)
// }
async validateResendingUser(email: string):Promise<boolean>{
  return this.userSqlRepository.validateResendingUser(email)
}
}







