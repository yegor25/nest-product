import { DataSource } from "typeorm";
import { LikeStatus } from "./like.schema";
export declare class PostLikeSqlRepository {
    protected dataSource: DataSource;
    constructor(dataSource: DataSource);
    create(userId: string, postId: string, likeStatus: LikeStatus, login: string): Promise<void>;
    getByPostId(postId: string): Promise<any>;
    checkReaction(userId: string, postId: string): Promise<boolean>;
    changeExistReaction(userId: string, postId: string, likeStatus: LikeStatus): Promise<any>;
}
