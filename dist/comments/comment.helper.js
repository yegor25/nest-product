"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentHelper = void 0;
const like_schema_1 = require("../postLikes/like.schema");
class CommentHelper {
    commentsMapper(comment, userId) {
        const userReaction = comment.likeComments.find(c => c.userId === userId);
        const res = {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: comment.likesCount,
                dislikesCount: comment.dislikesCount,
                myStatus: userReaction ? userReaction.status : like_schema_1.LikeStatus.None
            }
        };
        return res;
    }
}
exports.commentHelper = new CommentHelper();
//# sourceMappingURL=comment.helper.js.map