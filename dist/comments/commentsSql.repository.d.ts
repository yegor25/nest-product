import { DataSource } from "typeorm";
import { CommentSqlDbType, CommentSqlQueryDbType } from "./comment.schema";
export declare class CommentsSqlRepository {
    protected dataSource: DataSource;
    constructor(dataSource: DataSource);
    createComment(postId: string, content: string, userId: string): Promise<CommentSqlDbType>;
    findById(commentId: string, userId?: string): Promise<CommentSqlQueryDbType | null>;
    deleteById(id: string, userId: string): Promise<boolean>;
    updateComment(id: string, userId: string, content: string): Promise<boolean>;
}
