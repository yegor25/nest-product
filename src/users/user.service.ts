import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

import { userHelper } from './user.helper';
import { CreateUserDtoType, ResponseUserDtoType, paramsUserPaginatorType, ResponseAllUserDto, User, CreatedUserDtoDbType } from './user.schema';
import { cryptoService } from '../common/crypto.service';

@Injectable()
export class UserService {
  constructor(protected userRepository: UserRepository) {}
  async createUser(
    createUserDto: CreateUserDtoType,
  ): Promise<ResponseUserDtoType> {
    const hash = await cryptoService.genHash(createUserDto.password)
    const dtoUser:CreatedUserDtoDbType ={
      passwordSalt:  hash.salt,
      hashPassword: hash.hash,
      login: createUserDto.login,
      email: createUserDto.email,

    }
    const newUser = await this.userRepository.create(dtoUser);
    return userHelper.userViewMapper(newUser);
  }
  async findUsers(
    params: paramsUserPaginatorType,
  ): Promise<ResponseAllUserDto> {
    return this.userRepository.findUsers(params);
  }
  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
  async validateUser(loginOrEmail: string, pass: string):Promise<User | null> {
    return this.userRepository.validateUser(loginOrEmail, pass)
  }
}







