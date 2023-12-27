import { Blog, SortDirection, blogItemsResponseType, dbBlogPaginatorType, paramsBlogPaginatorType } from "./blog.schema";



export const blogHelper = {
    getViewBlog (blog: Blog):blogItemsResponseType{
        const res:blogItemsResponseType = {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
        return res
    },
    blogParamsMapper(params: paramsBlogPaginatorType):dbBlogPaginatorType {
        const res: dbBlogPaginatorType = {
        searchNameTerm: params.searchNameTerm ? params.searchNameTerm : '',
          sortDirection: params.sortDirection === SortDirection.asc ? 1 : -1,
          pageNumber: params.pageNumber ? +params.pageNumber : 1,
          pageSize: params.pageSize ? +params.pageSize : 10,
          sortBy: params.sortBy ? params.sortBy : 'createdAt',
        };
        return res;
      },
}