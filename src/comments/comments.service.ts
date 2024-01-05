import { UserService } from "../users/user.service"
import { PostService } from "../posts/post.service"
import { User } from "../users/user.schema"
import { CommentViewModelType, CreatedCommentDto, commentForDbDtoType } from "./comment.schema"
import { CommentsRepository } from "./comments.repository"
import { Injectable } from "@nestjs/common"

@Injectable()
export class CommentService {
    constructor(
        private commentsRepository: CommentsRepository,
        protected postService: PostService,
        private userService: UserService
    ){}
    async createComment(postId: string, data: CreatedCommentDto, userId: string): Promise<CommentViewModelType | null> {
        console.log("userid", userId)
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
    // async deleteComment(id: string, userId: string): Promise<boolean> {
    //     return this.commentsRepository.deleteComments(convertId(id), userId)
    // }
    // async updateComment(id: string, userId: string, content: string): Promise<boolean> {
    //     return this.commentsRepository.updateComment(convertId(id), userId, content)
    // }
    // async deleteAllComments():Promise<boolean>{
    //     return this.commentsRepository.deleteAll()
    // }
    // async updateLikeStatus(likeStatus: LikeStatus, userId: string, commentId: string):Promise<boolean>{
    //     const comment = await QueryCommentsRepository.getCommentModelById(commentId)
    //     comment?.changeLikeStatus(userId, likeStatus)
    //     await comment?.save()
    //     return true
    // }
}