import { BlogRepository } from "./blogs.repository";
import { blogItemsResponseType, createdDtoBlogType } from "./blog.schema";
export declare class BlogService {
    protected blogRepository: BlogRepository;
    constructor(blogRepository: BlogRepository);
    create(dto: createdDtoBlogType): Promise<blogItemsResponseType>;
    findById(id: string): Promise<blogItemsResponseType | null>;
    changeBlog(id: string, dto: createdDtoBlogType): Promise<boolean>;
    deleteAll(): Promise<import("mongodb").DeleteResult>;
}
