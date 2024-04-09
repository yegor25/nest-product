import { DataSource, Repository } from "typeorm";
import { CommentSqlQueryDbType, paramsCommentsPaginatorType, viewAllComentsSqlType } from "./comment.schema";
import { LikeStatus } from "../postLikes/like.schema";
import { Comments } from "./comment.entity";
import { CommentLikes } from "../commentsLikes/commentLike.entity";
export declare class CommentsSqlRepository {
    protected dataSource: DataSource;
    protected commentRepo: Repository<Comments>;
    protected clRepo: Repository<CommentLikes>;
    constructor(dataSource: DataSource, commentRepo: Repository<Comments>, clRepo: Repository<CommentLikes>);
    createComment(postId: string, content: string, userId: string): Promise<any>;
    findById(commentId: string, userId?: string): Promise<CommentSqlQueryDbType | null>;
    deleteById(id: string, userId: string): Promise<boolean>;
    updateComment(id: string, userId: string, content: string): Promise<boolean>;
    findCommentsByPostId(postId: string, params: paramsCommentsPaginatorType, userId?: string): Promise<viewAllComentsSqlType>;
    changeExistLikeStatus(likesStatus: LikeStatus, userId: string, commentId: string): Promise<boolean>;
    checkExistReaction(userId: string, commentId: string): Promise<boolean>;
    changeLikeStatus(userId: string, commentId: string, status: LikeStatus): Promise<import("typeorm").InsertResult>;
}
