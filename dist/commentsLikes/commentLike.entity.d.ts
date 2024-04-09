import { Comments } from "../comments/comment.entity";
import { LikeStatus } from "../postLikes/like.schema";
export declare class CommentLikes {
    id: string;
    createdAt: string;
    status: LikeStatus;
    userId: string;
    commentId: string;
    comment: Comments;
}
