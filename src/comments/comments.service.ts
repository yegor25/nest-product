import { UserService } from "../users/user.service"
import { PostService } from "../posts/post.service"
import { User } from "../users/user.schema"
import { CommentSqlDbType, CommentViewModelType, Comments, CreatedCommentDto, commentForDbDtoType, paramsCommentsPaginatorType, viewAllCommentsType } from "./comment.schema"
import { CommentsRepository } from "./comments.repository"
import { Injectable } from "@nestjs/common"
import { LikeStatus } from "../postLikes/like.schema"
import { commentHelper } from "./comment.helper"
import { CommentsSqlRepository } from "./commentsSql.repository"

@Injectable()
export class CommentService {
    constructor(
        private commentsRepository: CommentsRepository,
        protected postService: PostService,
        private userService: UserService,
        protected commentSqlRepository: CommentsSqlRepository
    ){}
    async createComment(postId: string, data: CreatedCommentDto, userId: string): Promise<CommentViewModelType | null> {
        const post = await this.postService.findPostById(postId)
        if (!post) {
            return null
        }
        const user = await this.userService.findById(userId)
        if(!user) return null
        // const newComment: CommentSqlDbType = {
        //     content: data.content,
        //     postId,
        //     commentatorInfo: {
        //         userId: userId,
        //         userLogin: user.login
        //     }
        // }
        const newComment = await  this.commentSqlRepository.createComment(post.id,data.content,user.id)
        return {
            id: newComment.id,
            content: newComment.content,
            createdAt: newComment.createdAt,
            commentatorInfo: {
                userId: user.id,
                userLogin: user.login
            },
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: LikeStatus.None
            }
        }
    }
    async findById(id: string, userId?: string):Promise<CommentViewModelType | null>{
        const query = await this.commentSqlRepository.findById(id, userId)
        console.log("q", query)
        if(!query) return null
        return commentHelper.commentsMapperFromSql(query)
    }
    async findCommentsByPostId(postId: string,params: paramsCommentsPaginatorType ,userId?: string):Promise<viewAllCommentsType>{
        const comments = await this.commentSqlRepository.findCommentsByPostId(postId, params,userId)
        return {
            ...comments,
            items: comments.items.map(el => commentHelper.commentsMapperFromSql(el))
        }
    }
    async deleteComment(id: string, userId: string): Promise<boolean> {
        return this.commentSqlRepository.deleteById(id, userId)
    }
    async updateComment(id: string, userId: string, content: string): Promise<boolean> {
        return this.commentSqlRepository.updateComment(id, userId, content)
    }
    // async deleteAllComments():Promise<boolean>{
    //     return this.commentsRepository.deleteAll()
    // }
    async updateLikeStatus(likeStatus: LikeStatus, userId: string, commentId: string):Promise<boolean>{
       const newStatus = await this.commentsRepository.changeExistLikeStatus(likeStatus, commentId,userId)
       if(!newStatus) return false
        return true
    }
}