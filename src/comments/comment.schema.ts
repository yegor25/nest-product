import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"
import { LikeStatus } from "../postLikes/like.schema"
import { MaxLength, MinLength } from "class-validator"
import { Transform } from "class-transformer"



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
        default: []
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
    likeComments: [CommentsLike]

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

export type likeInfo = {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus
}


export const CommentsSchema = SchemaFactory.createForClass(Comments)













