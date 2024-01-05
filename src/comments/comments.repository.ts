import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CommentViewModelType, Comments, commentForDbDtoType } from "./comment.schema";
import { Model } from "mongoose";
import { commentHelper } from "./comment.helper";



@Injectable()
export class CommentsRepository {
    constructor(@InjectModel(Comments.name) private commentsModel: Model<Comments>){}

    async createComment(comment: commentForDbDtoType): Promise<CommentViewModelType> {
        const res = await this.commentsModel.create(comment)
        console.log("res", res)
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
    async deleteAll(): Promise<boolean> {
        const res = await this.commentsModel.deleteMany({})
        return res.deletedCount > 0
    }
}