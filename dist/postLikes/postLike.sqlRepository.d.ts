import { DataSource, Repository } from "typeorm";
import { LikeStatus } from "./like.schema";
import { PostLikes } from "./postLike.entity";
export declare class PostLikeSqlRepository {
    protected dataSource: DataSource;
    protected plRepo: Repository<PostLikes>;
    constructor(dataSource: DataSource, plRepo: Repository<PostLikes>);
    create(userId: string, postId: string, likeStatus: LikeStatus, login: string): Promise<import("typeorm").InsertResult>;
    getByPostId(postId: string): Promise<PostLikes | null>;
    checkReaction(userId: string, postId: string): Promise<boolean>;
    changeExistReaction(userId: string, postId: string, likeStatus: LikeStatus): Promise<import("typeorm").UpdateResult>;
}
