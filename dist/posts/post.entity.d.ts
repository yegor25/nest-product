import { Comments } from "../comments/comment.entity";
import { Blog } from "../blogs/blog.entity";
import { PostLikes } from "../postLikes/postLike.entity";
export declare class Post {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogName: string;
    createdAt: string;
    blogId: string;
    comments: Comments[];
    blog: Blog;
    postLikes: PostLikes[];
}
