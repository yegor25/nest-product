import { LikeStatus } from "../postLikes/like.schema";
import { CommentViewModelType, Comments } from "./comment.schema";



class CommentHelper {
    commentsMapper(comment: Comments, userId: string):CommentViewModelType{
        const userReaction = comment.likeComments.find(c => c.userId === userId)
        const res:CommentViewModelType = {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: comment.likesCount,
                dislikesCount: comment.dislikesCount,
                myStatus: userReaction ? userReaction.status : LikeStatus.None
            }
        }
        return res
    }

    
}


export const commentHelper = new CommentHelper()