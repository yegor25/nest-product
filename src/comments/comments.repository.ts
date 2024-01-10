import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CommentViewModelType, Comments, CommentsLike, commentForDbDtoType, paramsCommentsPaginatorType, viewAllCommentsType } from "./comment.schema";
import { Model } from "mongoose";
import { commentHelper } from "./comment.helper";
import { LikeStatus } from "../postLikes/like.schema";



@Injectable()
export class CommentsRepository {
    constructor(@InjectModel(Comments.name) private commentsModel: Model<Comments>){}

    async createComment(comment: commentForDbDtoType): Promise<CommentViewModelType> {
        const res = await this.commentsModel.create(comment)
        return commentHelper.commentsMapper(res, comment.commentatorInfo.userId)
    }
    async deleteComments(id: string, userId: string): Promise<boolean> {
        const comment = await this.commentsModel.findById(id)
        if (comment?.commentatorInfo.userId !== userId) {
            return false
        }
        const res = await this.commentsModel.findByIdAndDelete(id)
        if(!res) return false
        return true
    }
    async updateComment(id: string, userId: string, content: string): Promise<boolean> {
        const comment = await this.commentsModel.findById(id)
        if (comment?.commentatorInfo.userId !== userId) {
            return false
        }
        const res = await this.commentsModel.findByIdAndUpdate( id , { $set: { content: content } })
        if(!res) return false
        return true
    }
    async findById(id: string):Promise<Comments | null>{
        return this.commentsModel.findById(id)
    }
    async findCommentsByPostId(postId: string, params: paramsCommentsPaginatorType,userId?: string):Promise<viewAllCommentsType>{
              const parametres = commentHelper.commentsParamsMapper(params)
      const skipCount = (parametres.pageNumber - 1) * parametres.pageSize
      const comments = await this.commentsModel.find({postId: postId})
     .sort({[parametres.sortBy]: parametres.sortDirection, "_id":parametres.sortDirection })
     .skip(skipCount)
     .limit(parametres.pageSize)

     const totalCount = await this.commentsModel.countDocuments({postId})
          return {
              pagesCount:Math.ceil(totalCount/+parametres.pageSize),
              page: +parametres.pageNumber,
              pageSize: +parametres.pageSize,
              totalCount,
              items: comments.map(el => commentHelper.commentsMapper(el,userId))
          }
  
    }
    async deleteAll(): Promise<boolean> {
        const res = await this.commentsModel.deleteMany({})
        return res.deletedCount > 0
    }

    async changeExistLikeStatus(status:LikeStatus, commentId: string, userId: string){
        const post = await this.commentsModel.findById(commentId)
        if(!post) return false
        const newItem:CommentsLike = {userId, status}
        const existReaction = post.likeComments.find(el => el.userId === userId)
        if(!existReaction){
            post.likeComments.push(newItem)
            await post.save()
            return true
        } else {
            post.likeComments = post.likeComments.map(el => el.userId === userId ? {...el, status: status} : el)
            await post.save()
            return
        }
    }
}