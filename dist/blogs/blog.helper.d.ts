import { Blog, blogItemsResponseType, dbBlogPaginatorType, paramsBlogPaginatorType } from "./blog.schema";
export declare const blogHelper: {
    getViewBlog(blog: Blog): blogItemsResponseType;
    blogParamsMapper(params: paramsBlogPaginatorType): dbBlogPaginatorType;
};
