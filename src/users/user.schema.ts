import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty, MinLength, isEmail } from 'class-validator';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop()
  login: string;

  @Prop()
  email: string;

  @Prop({
    default: new Date().toISOString(),
  })
  createdAt: string;

  @Prop()
  hashPassword: string;

  @Prop()
  passwordSalt: string;

  //   @Prop()
  //   emailConfirmation: {
  //     code: string;
  //     isConfirmed: boolean;
  //     expirationDate: Date;
  //   };
}


export type PaginatorType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
};

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

export class CreateUserDtoType  {

  @IsNotEmpty()
  @MinLength(3)
  login: string;
  password: string;

  @IsEmail()
  email: string;
};

export type CreatedUserDtoDbType = {
  passwordSalt:  string,
      hashPassword: string,
      login: string,
      email: string,
}
export type ResponseUserDtoType = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};

export type ResponseAllUserDto = PaginatorType & {
  items: ResponseUserDtoType[];
};

export type paramsUserPaginatorType = {
  pageNumber: string;
  pageSize: string;
  searchLoginTerm: string;
  searchEmailTerm: string;
  sortBy: keyof User;
  sortDirection: SortDirection;
};

export type dbUsersPaginatorType = {
  searchLoginTerm: string;
  searchEmailTerm: string;
  sortBy: keyof User;
  sortDirection: 1 | -1;
  pageNumber: number;
  pageSize: number;
};

export type loginDtoType = {
  loginOrEmail: string,
  pass: string
}

export const UserSchema = SchemaFactory.createForClass(User);
