import { CommentService } from "./comments.service";
import { CreatedCommentDto } from "./comment.schema";
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    getById(commentId: string): Promise<import("./comment.schema").Comments>;
    deleteComment(commentId: string, req: {
        user: {
            userId: string;
        };
    }): Promise<void>;
    changeComment(body: CreatedCommentDto, commentId: string, req: {
        user: {
            userId: string;
        };
    }): Promise<void>;
}
