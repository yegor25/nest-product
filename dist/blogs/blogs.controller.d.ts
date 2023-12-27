import { createdDtoBlogType } from "./blog.schema";
import { BlogService } from "./blog.service";
export declare class BlogController {
    protected blogService: BlogService;
    constructor(blogService: BlogService);
    createBlog(body: createdDtoBlogType): Promise<import("./blog.schema").blogItemsResponseType>;
    findBlogById(blogId: string): Promise<import("./blog.schema").blogItemsResponseType>;
}
