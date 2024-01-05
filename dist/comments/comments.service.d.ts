import { UserService } from "../users/user.service";
import { PostService } from "../posts/post.service";
import { CommentViewModelType, CreatedCommentDto } from "./comment.schema";
import { CommentsRepository } from "./comments.repository";
export declare class CommentService {
    private commentsRepository;
    protected postService: PostService;
    private userService;
    constructor(commentsRepository: CommentsRepository, postService: PostService, userService: UserService);
    createComment(postId: string, data: CreatedCommentDto, userId: string): Promise<CommentViewModelType | null>;
}
