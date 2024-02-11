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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { PostLikeRepository } from "./postLike.repository";
import { LikeStatus } from "./like.schema";
export declare class PostLikeService {
    private postLikeRepository;
    constructor(postLikeRepository: PostLikeRepository);
    checkReaction(userId: string, postId: string): Promise<boolean>;
    changeExistReaction(userId: string, postId: string, likeStatus: LikeStatus): Promise<boolean>;
    addNewReaction(userId: string, postId: string, likeStatus: LikeStatus, login: string): Promise<void>;
    getByPostId(postId: string): Promise<(import("mongoose").Document<unknown, {}, import("./like.schema").LikesPost> & import("./like.schema").LikesPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("./like.schema").LikesPost> & import("./like.schema").LikesPost & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
