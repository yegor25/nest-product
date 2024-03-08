import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"
import { PaginatorType, SortDirection } from "../users/user.schema";
import {  LikeStatus, extendedLikesInfo, postLikeType } from "../postLikes/like.schema";
import { Transform } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsString, MaxLength, Validate, isString } from "class-validator";
import { BadRequestException } from "@nestjs/common";
import { PostValidator } from "./post.validate";

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

export type postSqlDbType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,
}

export class createdPostDtoType  {

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(30)
    title: string
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(100)
    shortDescription: string
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(1000)
    content: string
    @IsNotEmpty()
    @IsString()
    @Validate(PostValidator)
    blogId: string
}
export class updatedPostDtoType  {

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(30)
    title: string
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(100)
    shortDescription: string
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(1000)
    content: string
    
}

export class createdPosForBlogtDtoType  {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(30)
    title: string
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(100)
    shortDescription: string
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(1000)
    content: string
}
export class postDtoTypeForBlog {
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(30)
    title: string
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(100)
    shortDescription: string
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(1000)
    content: string
}



export type viewAllPostsType = PaginatorType & {
    items: postDtoResponseType[]
}

export type paramsPostPaginatorType = {
    sortBy: keyof Post,
    sortDirection: SortDirection,
    pageNumber: number,
    pageSize: number
}
export type dbPostsPaginatorType = {
    sortBy: keyof Post,
    sortDirection: 1 | -1,
    pageNumber: number,
    pageSize: number
}

export const PostSchema = SchemaFactory.createForClass(Post)

PostSchema.methods = {
    getDefaultLikes: Post.prototype.getDefaultLikes
}

export type postSqlQueryType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogName: string,
    createdAt: string,
    blogId: string,
    likesCount: string,
    dislikesCount: string,
    myStatus: null | LikeStatus,
    newestLikes: postLikeType[]
}