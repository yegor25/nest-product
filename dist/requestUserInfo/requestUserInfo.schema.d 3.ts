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
import mongoose, { HydratedDocument } from "mongoose";
export type UserRequestDocument = HydratedDocument<UserRequestInfo>;
export declare class UserRequestInfo {
    _id: mongoose.Types.ObjectId;
    IP: string;
    URL: string;
    date: Date;
}
export type requestUserInfoType = {
    IP: string;
    URL: string;
    date: Date;
};
export declare const UserRequestInfoSchema: mongoose.Schema<UserRequestInfo, mongoose.Model<UserRequestInfo, any, any, any, mongoose.Document<unknown, any, UserRequestInfo> & UserRequestInfo & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserRequestInfo, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserRequestInfo>> & mongoose.FlatRecord<UserRequestInfo> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
