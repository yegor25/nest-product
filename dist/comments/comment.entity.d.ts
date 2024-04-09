import { Users } from "../users/entities/user.entity";
import { Post } from "../posts/post.entity";
import { CommentLikes } from "../commentsLikes/commentLike.entity";
export declare class Comments {
    id: string;
    content: string;
    createdAt: string;
    postId: string;
    userId: string;
    likes: CommentLikes[];
    post: Post;
    user: Users;
}
