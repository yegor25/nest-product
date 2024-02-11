"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHelper = void 0;
const user_schema_1 = require("../users/user.schema");
const like_schema_1 = require("../postLikes/like.schema");
exports.postHelper = {
    postViewMapperDefault(post) {
        let likesCount = 0;
        let dislikesCount = 0;
        let myStatus = like_schema_1.LikeStatus.None;
        const res = {
            id: post._id.toString(),
            blogId: post.blogId,
            shortDescription: post.shortDescription,
            title: post.title,
            content: post.content,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                likesCount,
                dislikesCount,
                myStatus,
                newestLikes: []
            }
        };
        return res;
    },
    postViewMapper(post, likePosts, userId) {
        let likesCount = 0;
        let dislikesCount = 0;
        let myStatus = like_schema_1.LikeStatus.None;
        likePosts.forEach(el => {
            if (el.status === like_schema_1.LikeStatus.Like && el.postId === post._id.toString()) {
                likesCount += 1;
                if (el.userId === userId)
                    myStatus = el.status;
                return;
            }
            if (el.status === like_schema_1.LikeStatus.Dislike && el.postId === post._id.toString()) {
                dislikesCount += 1;
                if (el.userId === userId)
                    myStatus = el.status;
                return;
            }
        });
        const newestLikes = likePosts.filter(el => el.status === like_schema_1.LikeStatus.Like && el.postId === post._id.toString()).sort((a, b) => a.addedAt < b.addedAt ? 1 : -1).splice(0, 3).map(el => ({ addedAt: el.addedAt.toISOString(), userId: el.userId, login: el.login }));
        const res = {
            id: post._id.toString(),
            blogId: post.blogId,
            shortDescription: post.shortDescription,
            title: post.title,
            content: post.content,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                likesCount,
                dislikesCount,
                myStatus,
                newestLikes: newestLikes
            }
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