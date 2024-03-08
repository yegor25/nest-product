import { DataSource } from "typeorm";
import { createdPosForBlogtDtoType, createdPostDtoType, postSqlDbType } from "./post.schema";
export declare class PostSqlRepository {
    protected dataSource: DataSource;
    constructor(dataSource: DataSource);
    createForBlog(dto: createdPosForBlogtDtoType, blogId: string, blogName: string): Promise<postSqlDbType>;
    create(dto: createdPostDtoType, blogName: string): Promise<postSqlDbType>;
}
