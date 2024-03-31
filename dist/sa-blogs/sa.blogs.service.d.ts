import { SuperAdminBlogsRepository } from "./sa.blogs.repository";
import { createdDtoBlogType, paramsBlogPaginatorType } from "../blogs/blog.schema";
import { blogSqlDbType, responseDtoSqlBlogType } from "./sa.blogs.types";
export declare class SuperAdminBlogService {
    protected suBlogsRepository: SuperAdminBlogsRepository;
    constructor(suBlogsRepository: SuperAdminBlogsRepository);
    create(dto: createdDtoBlogType): Promise<blogSqlDbType>;
    findBlogs(params: paramsBlogPaginatorType): Promise<responseDtoSqlBlogType>;
    findById(id: string): Promise<blogSqlDbType | null>;
    changeBlog(id: string, dto: createdDtoBlogType): Promise<boolean>;
    deleteBlogById(id: string): Promise<boolean>;
    deleteAll(): Promise<import("typeorm").DeleteResult>;
}
