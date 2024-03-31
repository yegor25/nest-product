import { createdDtoBlogType, paramsBlogPaginatorType } from "../blogs/blog.schema";
import { DataSource, Repository } from "typeorm";
import { blogSqlDbType, responseDtoSqlBlogType } from "./sa.blogs.types";
import { Blog } from "../blogs/blog.entity";
export declare class SuperAdminBlogsRepository {
    protected dataSource: DataSource;
    protected blogRepo: Repository<Blog>;
    constructor(dataSource: DataSource, blogRepo: Repository<Blog>);
    create(dto: createdDtoBlogType): Promise<blogSqlDbType>;
    findById(id: string): Promise<blogSqlDbType | null>;
    findBlogs(params: paramsBlogPaginatorType): Promise<responseDtoSqlBlogType>;
    changeBlog(id: string, dto: createdDtoBlogType): Promise<boolean>;
    deleteBlogById(blogId: string): Promise<boolean>;
    deleteAll(): Promise<import("typeorm").DeleteResult>;
}
