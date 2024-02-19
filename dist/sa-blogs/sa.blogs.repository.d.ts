import { createdDtoBlogType, paramsBlogPaginatorType } from "../blogs/blog.schema";
import { DataSource } from "typeorm";
import { blogSqlDbType, responseDtoSqlBlogType } from "./sa.blogs.types";
export declare class SuperAdminBlogsRepository {
    protected dataSource: DataSource;
    constructor(dataSource: DataSource);
    create(dto: createdDtoBlogType): Promise<blogSqlDbType>;
    findById(id: string): Promise<blogSqlDbType | null>;
    findBlogs(params: paramsBlogPaginatorType): Promise<responseDtoSqlBlogType>;
    changeBlog(id: string, dto: createdDtoBlogType): Promise<boolean>;
    deleteBlogById(blogId: string): Promise<boolean>;
}
