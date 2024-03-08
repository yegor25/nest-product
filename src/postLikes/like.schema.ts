
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export enum LikeStatus {
    None = "None", 
    Like = "Like", 
    Dislike = "Dislike" 
}
export type extendedLikesInfo = {
    likesCount: number,
    dislikesCount: number,
    myStatus: LikeStatus,
    newestLikes: postLikeType[]
}

export type postLikeType = {
    addedAt: string,
    userId: string,
    login: string
}
export type LikePostDocument = HydratedDocument<LikesPost>

export type postSqlDbType = {
    status:LikeStatus ,
    userId: string ,
    addedAt: Date,
    login: string ,
    postId: string 
}


@Schema()
export class LikesPost  {
    _id: mongoose.Types.ObjectId;

    @Prop({
        default: new Date()
    })
    addedAt: Date

    @Prop()
    userId: string
    
    @Prop()
    login: string

    @Prop()
    status: LikeStatus
    
    @Prop()
    postId: string
    
    @Prop()
    isFirst: boolean

     
   
}






export const LikePostSchema = SchemaFactory.createForClass(LikesPost)







 


