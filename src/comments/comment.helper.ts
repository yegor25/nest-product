import { LikeStatus } from "../postLikes/like.schema";
import { CommentViewModelType, Comments, dbCommentsPaginatorType, paramsCommentsPaginatorType } from "./comment.schema";
import { SortDirection } from "../blogs/blog.schema";



class CommentHelper {
    commentsMapper(comment: Comments, userId?: string):CommentViewModelType{
        const userReaction = comment.likeComments.find(c => c.userId === userId)
        const likesCount = comment.likeComments.filter(el => el.status === LikeStatus.Like)
        const dislikesCount = comment.likeComments.filter(el => el.status === LikeStatus.Dislike)
        const res:CommentViewModelType = {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: {
                userLogin: comment.commentatorInfo.userLogin,
                userId: comment.commentatorInfo.userId
            } ,
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: likesCount.length,
                dislikesCount: dislikesCount.length,
                myStatus: userReaction ? userReaction.status : LikeStatus.None
            }
        }
        return res
    }
    commentsParamsMapper(params: paramsCommentsPaginatorType):dbCommentsPaginatorType {
        const res:dbCommentsPaginatorType = {
            sortDirection: params.sortDirection === SortDirection.asc ? 1 : -1,
            pageNumber: params.pageNumber ? params.pageNumber : 1,
            pageSize: params.pageSize ? +params.pageSize : 10,
            sortBy: params.sortBy ? params.sortBy : "createdAt"
        }
        return res
    }
    

    
}


export const commentHelper = new CommentHelper()