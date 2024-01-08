import { UserService } from "../users/user.service";
import { PostService } from "../posts/post.service";
import { CommentViewModelType, CreatedCommentDto } from "./comment.schema";
import { CommentsRepository } from "./comments.repository";
import { LikeStatus } from "../postLikes/like.schema";
export declare class CommentService {
    private commentsRepository;
    protected postService: PostService;
    private userService;
    constructor(commentsRepository: CommentsRepository, postService: PostService, userService: UserService);
    createComment(postId: string, data: CreatedCommentDto, userId: string): Promise<CommentViewModelType | null>;
    findById(id: string, userId?: string): Promise<CommentViewModelType | null>;
    findCommentsByPostId(postId: string, userId?: string): Promise<CommentViewModelType[]>;
    deleteComment(id: string, userId: string): Promise<boolean>;
    updateComment(id: string, userId: string, content: string): Promise<boolean>;
    updateLikeStatus(likeStatus: LikeStatus, userId: string, commentId: string): Promise<boolean>;
}
