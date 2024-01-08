import { CommentViewModelType, Comments } from "./comment.schema";
declare class CommentHelper {
    commentsMapper(comment: Comments, userId?: string): CommentViewModelType;
}
export declare const commentHelper: CommentHelper;
export {};
