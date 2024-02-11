/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { HydratedDocument } from 'mongoose';
export declare class EmailConfirmation {
    code: string;
    isConfirmed: boolean;
    expirationDate: Date;
}
export type UserDocument = HydratedDocument<User>;
export declare class User {
    _id: mongoose.Types.ObjectId;
    login: string;
    email: string;
    createdAt: string;
    hashPassword: string;
    passwordSalt: string;
    emailConfirmation: EmailConfirmation;
}
export type PaginatorType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
};
export declare enum SortDirection {
    asc = "asc",
    desc = "desc"
}
export declare class CreateUserDtoType {
    login: string;
    password: string;
    email: string;
}
export type CreatedUserDtoDbType = {
    passwordSalt: string;
    hashPassword: string;
    login: string;
    email: string;
};
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
    loginOrEmail: string;
    pass: string;
};
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
