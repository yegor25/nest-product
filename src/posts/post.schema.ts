import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"
import { PaginatorType } from "../users/user.schema";
import { extendedLikesInfo, LikeStatus } from "src/postLikes/like.schema";

export type PostDocument = HydratedDocument<Post>

@Schema()
export class Post {
    _id: mongoose.Types.ObjectId;

    @Prop()
    title: string
    
    @Prop()
    shortDescription: string

    @Prop()
    content: string
    
    @Prop()
    blogId: string
    
    @Prop()
    blogName: string
   
    @Prop({
        default: new Date().toISOString()
    })
    createdAt: string

    getDefaultLikes (): extendedLikesInfo{
        return {
            likesCount: 0,
            dislikesCount: 0,
            myStatus: LikeStatus.None,
            newestLikes: []
        }
    }
    

}



export type postDtoResponseType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,
    extendedLikesInfo: extendedLikesInfo,
}


export type createdPostDtoType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}
export type postDtoTypeForBlog = {
    title: string,
    shortDescription: string,
    content: string,
}



export type viewAllPostsType = PaginatorType & {
    items: postDtoResponseType[]
}



export const PostSchema = SchemaFactory.createForClass(Post)

PostSchema.methods = {
    getDefaultLikes: Post.prototype.getDefaultLikes
}