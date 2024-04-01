import { Blog } from "../blogs/blog.entity";
export declare class Post {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogName: string;
    createdAt: string;
    blogId: string;
    blog: Blog;
}
