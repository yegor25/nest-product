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
import { CreatedUserDtoDbType, EmailConfirmation, ResponseAllUserDto, User, paramsUserPaginatorType } from './user.schema';
import { Model } from 'mongoose';
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreatedUserDtoDbType, emailData?: EmailConfirmation): Promise<User>;
    findUsers(params: paramsUserPaginatorType): Promise<ResponseAllUserDto>;
    validateUser(loginOrEmail: string, pass: string): Promise<User | null>;
    checkExistUser(email: string, login: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    checkCodeConfirmation(code: string): Promise<boolean>;
    changeConfirmationData(email: string, data: EmailConfirmation): Promise<string | null>;
    validateResendingUser(email: string): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    deleteAll(): Promise<any>;
}
