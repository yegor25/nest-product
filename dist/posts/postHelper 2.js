"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHelper = void 0;
const user_schema_1 = require("../users/user.schema");
exports.postHelper = {
    postViewMapper(post, likes) {
        const res = {
            id: post._id.toString(),
            blogId: post.blogId,
            shortDescription: post.shortDescription,
            title: post.title,
            content: post.content,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: likes
        };
        return res;
    },
    postParamsMapper(params) {
        const res = {
            sortDirection: params.sortDirection === user_schema_1.SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : 'createdAt'
        };
        return res;
    },
};
//# sourceMappingURL=postHelper.js.map