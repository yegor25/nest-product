import { LikeStatus } from "../postLikes/like.schema";
import { CommentViewModelType, Comments } from "./comment.schema";



class CommentHelper {
    commentsMapper(comment: Comments, userId?: string):CommentViewModelType{
        const userReaction = comment.likeComments.find(c => c.userId === userId)
        const likesCount = comment.likeComments.filter(el => el.status === LikeStatus.Like)
        const dislikesCount = comment.likeComments.filter(el => el.status === LikeStatus.Dislike)
        const res:CommentViewModelType = {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: likesCount.length,
                dislikesCount: dislikesCount.length,
                myStatus: userReaction ? userReaction.status : LikeStatus.None
            }
        }
        return res
    }

    
}


export const commentHelper = new CommentHelper()