import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength, isEmail } from 'class-validator';


@Schema()
export class EmailConfirmation {
  @Prop()
  code: string

  @Prop()
  isConfirmed: boolean

  @Prop()
  expirationDate: Date
}


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

    @Prop({
      type: EmailConfirmation,
      default: {
        code: "none",
        isConfirmed: true,
        expirationDate: new Date
      }
    })
    emailConfirmation: EmailConfirmation
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
  @MaxLength(10)
  login: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsEmail()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
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
