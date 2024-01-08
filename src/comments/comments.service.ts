import { UserService } from "../users/user.service"
import { PostService } from "../posts/post.service"
import { User } from "../users/user.schema"
import { CommentViewModelType, Comments, CreatedCommentDto, commentForDbDtoType } from "./comment.schema"
import { CommentsRepository } from "./comments.repository"
import { Injectable } from "@nestjs/common"
import { LikeStatus } from "../postLikes/like.schema"
import { commentHelper } from "./comment.helper"

@Injectable()
export class CommentService {
    constructor(
        private commentsRepository: CommentsRepository,
        protected postService: PostService,
        private userService: UserService
    ){}
    async createComment(postId: string, data: CreatedCommentDto, userId: string): Promise<CommentViewModelType | null> {
        const post = await this.postService.findPostById(postId)
        if (!post) {
            return null
        }
        const user = await this.userService.findById(userId)
        if(!user) return null
        const newComment: commentForDbDtoType = {
            content: data.content,
            postId,
            commentatorInfo: {
                userId: userId,
                userLogin: user.login
            }
        }
        return  this.commentsRepository.createComment(newComment)
    }
    async findById(id: string, userId?: string):Promise<CommentViewModelType | null>{
        const query = await this.commentsRepository.findById(id)
        if(!query) return null
        return commentHelper.commentsMapper(query,userId)
    }
    async findCommentsByPostId(postId: string, userId?: string):Promise<CommentViewModelType[]>{

        const query = await this.commentsRepository.findCommentsByPostId(postId)
        const result: CommentViewModelType[] = query.map(el => commentHelper.commentsMapper(el))
        return result
    }
    async deleteComment(id: string, userId: string): Promise<boolean> {
        return this.commentsRepository.deleteComments(id, userId)
    }
    async updateComment(id: string, userId: string, content: string): Promise<boolean> {
        return this.commentsRepository.updateComment(id, userId, content)
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