"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogHelper = void 0;
const blog_schema_1 = require("./blog.schema");
exports.blogHelper = {
    getViewBlog(blog) {
        const res = {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        };
        return res;
    },
    blogParamsMapper(params) {
        const res = {
            searchNameTerm: params.searchNameTerm ? params.searchNameTerm : '',
            sortDirection: params.sortDirection === blog_schema_1.SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? +params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : 'createdAt',
        };
        return res;
    },
};
//# sourceMappingURL=blog.helper.js.map