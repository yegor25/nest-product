import { DataSource } from "typeorm";
import { CommentSqlDbType, CommentSqlQueryDbType, paramsCommentsPaginatorType, viewAllComentsSqlType } from "./comment.schema";
import { LikeStatus } from "../postLikes/like.schema";
export declare class CommentsSqlRepository {
    protected dataSource: DataSource;
    constructor(dataSource: DataSource);
    createComment(postId: string, content: string, userId: string): Promise<CommentSqlDbType>;
    findById(commentId: string, userId?: string): Promise<CommentSqlQueryDbType | null>;
    deleteById(id: string, userId: string): Promise<boolean>;
    updateComment(id: string, userId: string, content: string): Promise<boolean>;
    findCommentsByPostId(postId: string, params: paramsCommentsPaginatorType, userId?: string): Promise<viewAllComentsSqlType>;
    changeExistLikeStatus(likesStatus: LikeStatus, userId: string, commentId: string): Promise<boolean>;
    checkExistReaction(userId: string, commentId: string): Promise<boolean>;
    changeLikeStatus(userId: string, commentId: string, status: LikeStatus): Promise<any>;
}
