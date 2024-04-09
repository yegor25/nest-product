import { createdDtoBlogType, paramsBlogPaginatorType } from "./blog.schema";
import { BlogService } from "./blog.service";
import { createdPosForBlogtDtoType, paramsPostPaginatorType } from "../posts/post.schema";
import { PostService } from "../posts/post.service";
export declare class BlogController {
    protected blogService: BlogService;
    protected postService: PostService;
    constructor(blogService: BlogService, postService: PostService);
    createBlog(body: createdDtoBlogType): Promise<import("./blog.schema").blogItemsResponseType>;
    createPost(blogId: string, body: createdPosForBlogtDtoType): Promise<import("../posts/post.schema").postDtoResponseType>;
    findBlogs(params: paramsBlogPaginatorType): Promise<import("./blog.schema").responseDtoBlogType>;
    findBlogById(blogId: string): Promise<import("./blog.schema").blogItemsResponseType>;
    findPostsForBlog(blogId: string, params: paramsPostPaginatorType & {
        userId: string;
    }): Promise<import("../posts/post.schema").viewAllPostsType>;
    changeBlog(blogId: string, body: createdDtoBlogType): Promise<void>;
    deleteBlog(blogId: string): Promise<void>;
}
