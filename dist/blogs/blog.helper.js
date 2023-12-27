"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogHelper = void 0;
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
    }
};
//# sourceMappingURL=blog.helper.js.map