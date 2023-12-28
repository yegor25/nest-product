"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHelper = void 0;
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
    }
};
//# sourceMappingURL=postHelper.js.map