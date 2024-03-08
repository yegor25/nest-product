import { BlogRepository } from "./blogs.repository";
import { blogItemsResponseType, createdDtoBlogType, paramsBlogPaginatorType, responseDtoBlogType } from "./blog.schema";
import { SuperAdminBlogsRepository } from "../sa-blogs/sa.blogs.repository";
export declare class BlogService {
    protected blogRepository: BlogRepository;
    protected blogsSqlRepository: SuperAdminBlogsRepository;
    constructor(blogRepository: BlogRepository, blogsSqlRepository: SuperAdminBlogsRepository);
    create(dto: createdDtoBlogType): Promise<blogItemsResponseType>;
    findBlogs(params: paramsBlogPaginatorType): Promise<responseDtoBlogType>;
    findById(id: string): Promise<blogItemsResponseType | null>;
    changeBlog(id: string, dto: createdDtoBlogType): Promise<boolean>;
    deleteBlogById(id: string): Promise<boolean>;
    deleteAll(): Promise<any>;
}
