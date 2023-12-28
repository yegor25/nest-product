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
export declare enum LikeStatus {
    None = "None",
    Like = "Like",
    Dislike = "Dislike"
}
export type extendedLikesInfo = {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus;
    newestLikes: postLikeType[];
};
export type postLikeType = {
    addedAt: string;
    userId: string;
    login: string;
};
export type LikePostDocument = HydratedDocument<LikesPost>;
export declare class LikesPost extends Document {
    _id: mongoose.Types.ObjectId;
    addedAt: Date;
    userId: string;
    login: string;
    status: LikeStatus;
    postId: string;
    isFirst: boolean;
    getDefaultLikes(): extendedLikesInfo;
    getNewstLikes(userId: string | null, reactions: LikesPost[]): extendedLikesInfo;
}
export declare const LikePostSchema: mongoose.Schema<LikesPost, mongoose.Model<LikesPost, any, any, any, mongoose.Document<unknown, any, LikesPost> & LikesPost & Required<{
    _id: mongoose.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, LikesPost, mongoose.Document<unknown, {}, mongoose.FlatRecord<LikesPost>> & mongoose.FlatRecord<LikesPost> & Required<{
    _id: mongoose.Types.ObjectId;
}>>;
