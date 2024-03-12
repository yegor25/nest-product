import { PostService } from "./post.service";
import { createdPostDtoType, paramsPostPaginatorType } from "./post.schema";
import { CreatedCommentDto, paramsCommentsPaginatorType } from "../comments/comment.schema";
import { CommentService } from "../comments/comments.service";
import { UserService } from "../users/user.service";
import { LikeStatus } from "../postLikes/like.schema";
export declare class PostController {
    protected postService: PostService;
    protected commentService: CommentService;
    protected userService: UserService;
    constructor(postService: PostService, commentService: CommentService, userService: UserService);
    createPost(body: createdPostDtoType): Promise<import("./post.schema").postDtoResponseType | null>;
    findPosts(params: paramsPostPaginatorType & {
        userId?: string;
    }): Promise<import("./post.schema").viewAllPostsType>;
    findPostById(postId: string, data: {
        userId: string;
    }): Promise<import("./post.schema").postDtoResponseType>;
    changePost(postId: string, body: createdPostDtoType): Promise<void>;
    deletePost(postId: string): Promise<void>;
    createComment(body: CreatedCommentDto, postId: string, req: {
        user: {
            userId: string;
        };
    }): Promise<import("../comments/comment.schema").CommentViewModelType>;
    findComments(postId: string, params: paramsCommentsPaginatorType & {
        userId: string;
    }): Promise<import("../comments/comment.schema").viewAllCommentsType>;
    changeLikeStatus(postId: string, body: {
        likeStatus: LikeStatus;
    }, req: {
        user: {
            userId: string;
            login: string;
        };
    }): Promise<boolean | void>;
}
