import { PaginatorType } from "../blogs/blog.schema";
export type blogSqlDbType = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
};
export type responseDtoSqlBlogType = PaginatorType & {
    items: blogSqlDbType[];
};
