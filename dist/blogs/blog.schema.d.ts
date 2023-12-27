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
export type BlogDocument = HydratedDocument<Blog>;
export declare class Blog {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    createdAt: string;
    websiteUrl: string;
    isMembership: boolean;
}
export type blogItemsResponseType = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
};
export type createdDtoBlogType = {
    name: string;
    description: string;
    websiteUrl: string;
};
export declare const BlogSchema: mongoose.Schema<Blog, mongoose.Model<Blog, any, any, any, mongoose.Document<unknown, any, Blog> & Blog & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Blog, mongoose.Document<unknown, {}, mongoose.FlatRecord<Blog>> & mongoose.FlatRecord<Blog> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
