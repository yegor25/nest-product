import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"
import { LikeStatus } from "../postLikes/like.schema"
import { MaxLength, MinLength } from "class-validator"
import { Transform } from "class-transformer"
import { PaginatorType, SortDirection } from "../blogs/blog.schema"



export type commentType = HydratedDocument<Comments>

@Schema()
export class CommentatorInfo {

    @Prop()
    userId: string

    @Prop()
    userLogin: string
}


@Schema()
export class CommentsLike {
    @Prop()
    userId: string

    @Prop({
        type: String,
        enum: LikeStatus,
        default: LikeStatus.None
    })
    status: LikeStatus
}

@Schema()
export class Comments {
    _id: mongoose.Types.ObjectId;

    @Prop()
    content: string;

    @Prop()
    commentatorInfo: CommentatorInfo

    @Prop({
        default: new Date().toISOString()
    })
    createdAt: string

    @Prop()
    postId: string

    @Prop({
        default: []
    })
    likeComments: CommentsLike[]

    @Prop({
        default: 0
    })
    likesCount: number

    @Prop({
        default: 0
    })
    dislikesCount: number
}

export class CreatedCommentDto  {
    @Transform(({value}) => (value.trim()))
    @MinLength(20)
    @MaxLength(300)
    content: string
}

export type commentForDbDtoType = {
    content: string,
    commentatorInfo: CommentatorInfo
    postId: string
}

export type CommentViewModelType = {
    id: string,
    content: string,
    commentatorInfo: CommentatorInfo,
    createdAt: string,
    likesInfo: likeInfo
}

export type CommentSqlDbType = {
    id: string,
    content: string,
    postId: string,
    userId: string,
    createdAt: string
}

export type CommentSqlQueryDbType = {
    id: string,
    content: string,
    userId: string,
    userLogin: string,
    likesCount: string,
    createdAt: string
    dislikesCount: string,
    myStatus: LikeStatus | null
}
export type paramsCommentsPaginatorType = {
    sortBy: keyof Comments,
    sortDirection: SortDirection,
    pageNumber: number,
    pageSize: number
}
export type dbCommentsPaginatorType = {
    sortBy: keyof Comments,
    sortDirection: 1 | -1,
    pageNumber: number,
    pageSize: number
}
export type viewAllCommentsType = PaginatorType & {
    items: CommentViewModelType[]
}

export type likeInfo = {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus
}


export const CommentsSchema = SchemaFactory.createForClass(Comments)













