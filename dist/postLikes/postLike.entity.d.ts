import { Post } from "../posts/post.entity";
import { Users } from "../users/entities/user.entity";
import { LikeStatus } from "./like.schema";
export declare class PostLikes {
    id: string;
    userId: string;
    addedAt: string;
    login: string;
    status: LikeStatus;
    postId: string;
    user: Users;
    post: Post;
}
