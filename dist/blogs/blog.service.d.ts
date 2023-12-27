import { BlogRepository } from "./blogs.repository";
import { blogItemsResponseType, createdDtoBlogType, paramsBlogPaginatorType, responseDtoBlogType } from "./blog.schema";
export declare class BlogService {
    protected blogRepository: BlogRepository;
    constructor(blogRepository: BlogRepository);
    create(dto: createdDtoBlogType): Promise<blogItemsResponseType>;
    findBlogs(params: paramsBlogPaginatorType): Promise<responseDtoBlogType>;
    findById(id: string): Promise<blogItemsResponseType | null>;
    changeBlog(id: string, dto: createdDtoBlogType): Promise<boolean>;
    deleteBlogById(id: string): Promise<boolean>;
    deleteAll(): Promise<import("mongodb").DeleteResult>;
}
