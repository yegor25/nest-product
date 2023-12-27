import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDtoType, ResponseAllUserDto, User, paramsUserPaginatorType } from './user.schema';
import { Model } from 'mongoose';

import { userHelper } from './user.helper';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDtoType): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findUsers(
    params: paramsUserPaginatorType,
  ): Promise<ResponseAllUserDto> {
    const parametres = userHelper.usersParamsMapper(params);
    const skipCount =
      (+parametres.pageNumber - 1) * Number(parametres.pageSize);
    const users = await this.userModel
      .find({
        $or: [
          { email: { $regex: parametres.searchEmailTerm, $options: 'i' } },
          { login: { $regex: parametres.searchLoginTerm, $options: 'i' } },
        ],
      })
      .sort({ [parametres.sortBy]: parametres.sortDirection, "_id":parametres.sortDirection })
      .skip(skipCount)
      .limit(+parametres.pageSize)
      .lean();

    const totalCount = await this.userModel.countDocuments({
      $or: [
        { email: { $regex: parametres.searchEmailTerm, $options: 'i' } },
        { login: { $regex: parametres.searchLoginTerm, $options: 'i' } },
      ],
    });
    return {
      pagesCount: Math.ceil(totalCount / +parametres.pageSize),
      page: +parametres.pageNumber,
      pageSize: +parametres.pageSize,
      totalCount,
      items: users.map((u) => userHelper.userViewMapper(u)),
    };
  }
  async delete(id: string): Promise<boolean> {
    const deleteUser = await this.userModel.findByIdAndDelete(id);
    if (!deleteUser) return false;
    return true;
  }
  async deleteAll (){
    return this.userModel.deleteMany({})
  }
}
