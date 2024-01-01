import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDtoType, CreatedUserDtoDbType, ResponseAllUserDto, User, paramsUserPaginatorType } from './user.schema';
import { Model } from 'mongoose';
import bcrypt from "bcrypt"

import { userHelper } from './user.helper';
import { cryptoService } from 'src/common/crypto.service';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreatedUserDtoDbType): Promise<User> {
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
  async validateUser(loginOrEmail: string, pass: string):Promise<User | null>{
    const user = await this.userModel.findOne({ $or: [{ email: loginOrEmail }, { login: loginOrEmail }] })
        if (!user) {
            return null
        }
        const isMatchedPasswords = await bcrypt.compare(pass, user.hashPassword)
        if(!isMatchedPasswords) return null
        return user
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
