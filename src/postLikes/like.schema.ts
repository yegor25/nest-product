
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




@Schema()
export class LikesPost extends Document {
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

     
   getNewstLikes ( userId: string | null, reactions: LikesPost[]): extendedLikesInfo  {
        let likeCount = 0
        let disLikeCount = 0
        let userStatus: LikeStatus = LikeStatus.None
        reactions.forEach(el => {
            if (el.status === LikeStatus.Like) likeCount += 1
            if (el.status === LikeStatus.Dislike) disLikeCount += 1
            if (userId && el.userId === userId) userStatus = el.status
        })
        const likes = reactions.filter(el => el.status === LikeStatus.Like  ).sort((a, b) => new Date(a.addedAt) < new Date(b.addedAt) ? 1 : -1)
        const newest: postLikeType[] = likes.splice(0,3).map(el => ({ addedAt: el.addedAt.toISOString(), userId: el.userId, login: el.login }))
        const result: extendedLikesInfo = {
            likesCount: likeCount,
            dislikesCount: disLikeCount,
            myStatus: userStatus,
            newestLikes: newest
        }
        return result

    }
}






export const LikePostSchema = SchemaFactory.createForClass(LikesPost)

LikePostSchema.methods = {
    getNewestLikes: LikesPost.prototype.getNewstLikes
}





 


