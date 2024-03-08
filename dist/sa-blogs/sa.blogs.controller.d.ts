import { createdDtoBlogType, paramsBlogPaginatorType } from "../blogs/blog.schema";
import { SuperAdminBlogService } from "./sa.blogs.service";
import { PostService } from "../posts/post.service";
import { createdPosForBlogtDtoType, paramsPostPaginatorType, updatedPostDtoType } from "../posts/post.schema";
export declare class SuperAdminBlogsController {
    protected suBlogsService: SuperAdminBlogService;
    protected postService: PostService;
    constructor(suBlogsService: SuperAdminBlogService, postService: PostService);
    createBlog(body: createdDtoBlogType): Promise<import("./sa.blogs.types").blogSqlDbType>;
    findBlogs(params: paramsBlogPaginatorType): Promise<import("./sa.blogs.types").responseDtoSqlBlogType>;
    findBlogById(blogId: string): Promise<import("./sa.blogs.types").blogSqlDbType>;
    changeBlog(blogId: string, body: createdDtoBlogType): Promise<void>;
    deleteBlog(blogId: string): Promise<void>;
    createPost(blogId: string, body: createdPosForBlogtDtoType): Promise<import("../posts/post.schema").postDtoResponseType>;
    findPostsByBlogId(blogId: string, params: paramsPostPaginatorType & {
        userId: string;
    }): Promise<void>;
    changePost(blogId: string, postId: string, body: updatedPostDtoType): Promise<void>;
}
