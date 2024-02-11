import { CommentViewModelType, Comments, dbCommentsPaginatorType, paramsCommentsPaginatorType } from "./comment.schema";
declare class CommentHelper {
    commentsMapper(comment: Comments, userId?: string): CommentViewModelType;
    commentsParamsMapper(params: paramsCommentsPaginatorType): dbCommentsPaginatorType;
}
export declare const commentHelper: CommentHelper;
export {};
