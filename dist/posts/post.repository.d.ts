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
import { Post, createdPosForBlogtDtoType, createdPostDtoType, paramsPostPaginatorType, viewAllPostsType } from "./post.schema";
import { Model } from "mongoose";
import { LikesPost } from "../postLikes/like.schema";
export declare class PostRepository {
    private postModel;
    constructor(postModel: Model<Post>);
    create(dto: createdPostDtoType, blogName: string): Promise<Post>;
    createForBlog(dto: createdPosForBlogtDtoType, blogId: string, blogName: string): Promise<Post>;
    changePost(dto: createdPostDtoType, id: string, blogName: string): Promise<boolean>;
    deletePost(id: string): Promise<boolean>;
    findPostById(id: string): Promise<Post | null>;
    findPosts(params: paramsPostPaginatorType, likePosts: LikesPost[], userId?: string): Promise<viewAllPostsType>;
    findPostsForBlog(params: paramsPostPaginatorType, blogId: string, likePosts: LikesPost[], userId?: string): Promise<viewAllPostsType>;
    deleteAll(): Promise<any>;
}
