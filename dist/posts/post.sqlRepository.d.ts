import { DataSource, Repository } from "typeorm";
import { allPostSqlViewType, createdPosForBlogtDtoType, createdPostDtoType, paramsPostPaginatorType, postSqlDbType, postSqlQueryType, updatedPostDtoType, viewAllPostsType } from "./post.schema";
import { Post } from "./post.entity";
export declare class PostSqlRepository {
    protected dataSource: DataSource;
    protected postRepo: Repository<Post>;
    constructor(dataSource: DataSource, postRepo: Repository<Post>);
    createForBlog(dto: createdPosForBlogtDtoType, blogId: string, blogName: string): Promise<postSqlDbType>;
    create(dto: createdPostDtoType, blogName: string): Promise<postSqlDbType>;
    findPostsForBlog(params: paramsPostPaginatorType, blogId: string, userId?: string): Promise<viewAllPostsType>;
    findById(postId: string, userId?: string): Promise<postSqlQueryType | null>;
    changeByBlogId(blogId: string, postId: string, dto: updatedPostDtoType): Promise<boolean>;
    deleteByBlogId(postId: string, blogId: string): Promise<boolean>;
    findPosts(params: paramsPostPaginatorType, userId?: string): Promise<allPostSqlViewType>;
    findPostsForBlogId(params: paramsPostPaginatorType, blogId: string, userId?: string): Promise<allPostSqlViewType>;
}
