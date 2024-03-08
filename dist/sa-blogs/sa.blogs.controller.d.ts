import { createdDtoBlogType, paramsBlogPaginatorType } from "../blogs/blog.schema";
import { SuperAdminBlogService } from "./sa.blogs.service";
import { createdPosForBlogtDtoType, paramsPostPaginatorType } from "../posts/post.schema";
export declare class SuperAdminBlogsController {
    protected suBlogsService: SuperAdminBlogService;
    constructor(suBlogsService: SuperAdminBlogService);
    createBlog(body: createdDtoBlogType): Promise<import("./sa.blogs.types").blogSqlDbType>;
    findBlogs(params: paramsBlogPaginatorType): Promise<import("./sa.blogs.types").responseDtoSqlBlogType>;
    findBlogById(blogId: string): Promise<import("./sa.blogs.types").blogSqlDbType>;
    changeBlog(blogId: string, body: createdDtoBlogType): Promise<void>;
    deleteBlog(blogId: string): Promise<void>;
    createPost(blogId: string, body: createdPosForBlogtDtoType): Promise<null>;
    findPostsByBlogId(blogId: string, params: paramsPostPaginatorType & {
        userId: string;
    }): Promise<void>;
}
