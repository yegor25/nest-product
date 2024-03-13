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
import { LikeStatus } from "../postLikes/like.schema";
import { PaginatorType, SortDirection } from "../blogs/blog.schema";
export type commentType = HydratedDocument<Comments>;
export declare class CommentatorInfo {
    userId: string;
    userLogin: string;
}
export declare class CommentsLike {
    userId: string;
    status: LikeStatus;
}
export declare class Comments {
    _id: mongoose.Types.ObjectId;
    content: string;
    commentatorInfo: CommentatorInfo;
    createdAt: string;
    postId: string;
    likeComments: CommentsLike[];
    likesCount: number;
    dislikesCount: number;
}
export declare class CreatedCommentDto {
    content: string;
}
export type commentForDbDtoType = {
    content: string;
    commentatorInfo: CommentatorInfo;
    postId: string;
};
export type CommentViewModelType = {
    id: string;
    content: string;
    commentatorInfo: CommentatorInfo;
    createdAt: string;
    likesInfo: likeInfo;
};
export type CommentSqlDbType = {
    id: string;
    content: string;
    postId: string;
    userId: string;
    createdAt: string;
};
export type CommentSqlQueryDbType = {
    id: string;
    content: string;
    userId: string;
    userLogin: string;
    likesCount: string;
    createdAt: string;
    dislikesCount: string;
    myStatus: LikeStatus | null;
};
export type paramsCommentsPaginatorType = {
    sortBy: keyof Comments;
    sortDirection: SortDirection;
    pageNumber: number;
    pageSize: number;
};
export type dbCommentsPaginatorType = {
    sortBy: keyof Comments;
    sortDirection: 1 | -1;
    pageNumber: number;
    pageSize: number;
};
export type viewAllCommentsType = PaginatorType & {
    items: CommentViewModelType[];
};
export type viewAllComentsSqlType = PaginatorType & {
    items: CommentSqlQueryDbType[];
};
export type likeInfo = {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus;
};
export declare const CommentsSchema: mongoose.Schema<Comments, mongoose.Model<Comments, any, any, any, mongoose.Document<unknown, any, Comments> & Comments & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comments, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comments>> & mongoose.FlatRecord<Comments> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
