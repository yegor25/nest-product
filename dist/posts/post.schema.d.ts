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
import { PaginatorType, SortDirection } from "../users/user.schema";
import { extendedLikesInfo } from "../postLikes/like.schema";
export type PostDocument = HydratedDocument<Post>;
export declare class Post {
    _id: mongoose.Types.ObjectId;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
    getDefaultLikes(): extendedLikesInfo;
}
export type postDtoResponseType = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
    extendedLikesInfo: extendedLikesInfo;
};
export declare class createdPostDtoType {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
}
export declare class createdPosForBlogtDtoType {
    title: string;
    shortDescription: string;
    content: string;
}
export type viewAllPostsType = PaginatorType & {
    items: postDtoResponseType[];
};
export type paramsPostPaginatorType = {
    sortBy: keyof Post;
    sortDirection: SortDirection;
    pageNumber: number;
    pageSize: number;
};
export type dbPostsPaginatorType = {
    sortBy: keyof Post;
    sortDirection: 1 | -1;
    pageNumber: number;
    pageSize: number;
};
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, mongoose.Document<unknown, any, Post> & Post & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post, mongoose.Document<unknown, {}, mongoose.FlatRecord<Post>> & mongoose.FlatRecord<Post> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
