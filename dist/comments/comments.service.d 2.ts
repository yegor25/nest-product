import { UserService } from "../users/user.service";
import { PostService } from "../posts/post.service";
import { CommentViewModelType, CreatedCommentDto, paramsCommentsPaginatorType, viewAllCommentsType } from "./comment.schema";
import { CommentsRepository } from "./comments.repository";
import { LikeStatus } from "../postLikes/like.schema";
import { CommentsSqlRepository } from "./commentsSql.repository";
export declare class CommentService {
    private commentsRepository;
    protected postService: PostService;
    private userService;
    protected commentSqlRepository: CommentsSqlRepository;
    constructor(commentsRepository: CommentsRepository, postService: PostService, userService: UserService, commentSqlRepository: CommentsSqlRepository);
    createComment(postId: string, data: CreatedCommentDto, userId: string): Promise<CommentViewModelType | null>;
    findById(id: string, userId?: string): Promise<CommentViewModelType | null>;
    findCommentsByPostId(postId: string, params: paramsCommentsPaginatorType, userId?: string): Promise<viewAllCommentsType>;
    deleteComment(id: string, userId: string): Promise<boolean>;
    updateComment(id: string, userId: string, content: string): Promise<boolean>;
    updateLikeStatus(likeStatus: LikeStatus, userId: string, commentId: string): Promise<boolean>;
}
