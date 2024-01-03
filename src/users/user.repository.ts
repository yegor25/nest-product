import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDtoType, CreatedUserDtoDbType, EmailConfirmation, ResponseAllUserDto, User, paramsUserPaginatorType } from './user.schema';
import { Model } from 'mongoose';
import bcrypt from "bcrypt"

import { userHelper } from './user.helper';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreatedUserDtoDbType, emailData?: EmailConfirmation): Promise<User> {
  if(!emailData) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  } else {
    const createdUser = new this.userModel({...createUserDto, emailConfirmation: emailData});
    return createdUser.save();
  }
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
  async checkExistUser(email: string, login: string):Promise<User | null>{
    const user = await this.userModel.findOne({
      $or: [
        {email:email},
        {login: login}
      ]
    })
    return user
  }
  async checkCodeConfirmation(code: string):Promise<boolean>{
    const user = await this.userModel.findOne({"emailConfirmation.code": code})
    // if(!user) return false
    if(user!.emailConfirmation.isConfirmed === true) {
      return false
    } 
    if(user!.emailConfirmation.expirationDate < new Date() ) return false
    user!.emailConfirmation.isConfirmed = true
    await user!.save()
    return true
}
async changeConfirmationData(email: string, data: EmailConfirmation):Promise<string | null>{
 const newUserCode = await this.userModel.updateOne(
  {email: email},
  {$set: {emailConfirmation: data}}
 )
 if(newUserCode.modifiedCount === 1) return data.code
 return null
 }
 async validateResendingUser(email: string):Promise<boolean>{
  const user = await this.userModel.findOne({email})
  if(user && user.emailConfirmation.isConfirmed === false) return true
  return false
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
