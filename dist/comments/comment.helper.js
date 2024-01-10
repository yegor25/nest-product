"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentHelper = void 0;
const like_schema_1 = require("../postLikes/like.schema");
class CommentHelper {
    commentsMapper(comment, userId) {
        const userReaction = comment.likeComments.find(c => c.userId === userId);
        const likesCount = comment.likeComments.filter(el => el.status === like_schema_1.LikeStatus.Like);
        const dislikesCount = comment.likeComments.filter(el => el.status === like_schema_1.LikeStatus.Dislike);
        const res = {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: {
                userLogin: comment.commentatorInfo.userLogin,
                userId: comment.commentatorInfo.userId
            },
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: likesCount.length,
                dislikesCount: dislikesCount.length,
                myStatus: userReaction ? userReaction.status : like_schema_1.LikeStatus.None
            }
        };
        return res;
    }
}
exports.commentHelper = new CommentHelper();
//# sourceMappingURL=comment.helper.js.map