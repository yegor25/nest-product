import { createdDtoBlogType, paramsBlogPaginatorType } from "./blog.schema";
import { BlogService } from "./blog.service";
export declare class BlogController {
    protected blogService: BlogService;
    constructor(blogService: BlogService);
    createBlog(body: createdDtoBlogType): Promise<import("./blog.schema").blogItemsResponseType>;
    findBlogs(params: paramsBlogPaginatorType): Promise<import("./blog.schema").responseDtoBlogType>;
    findBlogById(blogId: string): Promise<import("./blog.schema").blogItemsResponseType>;
    changeBlog(blogId: string, body: createdDtoBlogType): Promise<void>;
}
