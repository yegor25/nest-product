import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LikesPost } from "./like.schema";
import { Model } from "mongoose";



@Injectable()
export class postLikeRepository {
    constructor(@InjectModel(LikesPost.name) private likesPost:Model<LikesPost>){ }

   async getLikePosts(postId: string, userId: string | null){
    const likes = await this.likesPost.find({postId})
    
    
   }
   
}