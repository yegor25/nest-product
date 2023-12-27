import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

import { userHelper } from './user.helper';
import { CreateUserDtoType, ResponseUserDtoType, paramsUserPaginatorType, ResponseAllUserDto } from './user.schema';

@Injectable()
export class UserService {
  constructor(protected userRepository: UserRepository) {}
  async createUser(
    createUserDto: CreateUserDtoType,
  ): Promise<ResponseUserDtoType> {
    const newUser = await this.userRepository.create(createUserDto);
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
}
