import { CommentService } from "./comments.service";
import { CreatedCommentDto } from "./comment.schema";
import { LikeStatus } from "../postLikes/like.schema";
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    getById(commentId: string, params: {
        userId: string;
    }): Promise<import("./comment.schema").CommentViewModelType>;
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
    changeLikeStatus(commentId: string, body: {
        likeStatus: LikeStatus;
    }, req: {
        user: {
            userId: string;
            login: string;
        };
    }): Promise<boolean>;
}
