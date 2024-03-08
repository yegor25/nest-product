import { SuperAdminBlogsRepository } from "./sa.blogs.repository";
import { createdDtoBlogType, paramsBlogPaginatorType } from "../blogs/blog.schema";
import { blogSqlDbType, responseDtoSqlBlogType } from "./sa.blogs.types";
import { PostService } from "src/posts/post.service";
export declare class SuperAdminBlogService {
    protected suBlogsRepository: SuperAdminBlogsRepository;
    protected postService: PostService;
    constructor(suBlogsRepository: SuperAdminBlogsRepository, postService: PostService);
    create(dto: createdDtoBlogType): Promise<blogSqlDbType>;
    findBlogs(params: paramsBlogPaginatorType): Promise<responseDtoSqlBlogType>;
    findById(id: string): Promise<blogSqlDbType | null>;
    changeBlog(id: string, dto: createdDtoBlogType): Promise<boolean>;
    deleteBlogById(id: string): Promise<boolean>;
}
