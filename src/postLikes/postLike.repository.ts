import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LikeStatus, LikesPost } from "./like.schema";
import { Model } from "mongoose";



@Injectable()
export class PostLikeRepository {
    constructor(@InjectModel(LikesPost.name) private likesPost:Model<LikesPost>){ }

   async getByPostId(postId: string){
    const likes = await this.likesPost.find({postId})
    return likes
   }
   async getAll(){
    return this.likesPost.find()
   }

   async checkReaction(userId: string, postId: string):Promise<boolean>{
    const reaction = await this.likesPost.findOne({userId: userId, postId: postId})
    if(!reaction) return false
    return true
   }

   async changeExistReaction(userId:string, postId: string, likeStatus: LikeStatus){
    const newReaction = await this.likesPost.findOneAndUpdate(
        {userId: userId, postId: postId},
        {$set: {status: likeStatus, isFirst: false, addedAt: new Date()}}
    )
    if(!newReaction) return false
    return true
   }

   async addNewReaction(userId:string, postId: string, likeStatus: LikeStatus, login: string){
    const newReaction = new this.likesPost({
        status: likeStatus,
        userId,
        login,
        postId,
        isFirst: true
    })
    await newReaction.save()
    return
   }
   
   
}