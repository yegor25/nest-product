import { Injectable } from "@nestjs/common";
import { PostRepository } from "./post.repository";
import { createdPosForBlogtDtoType, createdPostDtoType, paramsPostPaginatorType, postDtoResponseType, viewAllPostsType } from "./post.schema";
import { postHelper } from "./postHelper";
import { BlogService } from "../blogs/blog.service";
import { PostLikeService } from "../postLikes/postLike.service";
import { LikeStatus } from "../postLikes/like.schema";


@Injectable()
export class PostService {
    constructor(
        protected postRepository: PostRepository,
        protected blogService: BlogService,
        protected postLikeService: PostLikeService
        ){}

    async create(dto: createdPostDtoType):Promise<postDtoResponseType | null>{
        const blog = await this.blogService.findById(dto.blogId)
        if(!blog) return null
        const newPost = await this.postRepository.create(dto, blog?.name as string)
        const resultDto = postHelper.postViewMapperDefault(newPost)
        return resultDto
    }
    async createForBlog(dto: createdPosForBlogtDtoType, blogId: string):Promise<postDtoResponseType | null>{
        const blog = await this.blogService.findById(blogId)
        if(!blog) return null
        const newPost = await this.postRepository.createForBlog(dto, blogId, blog.name)
        const likes = newPost.getDefaultLikes()
        const resultDto = postHelper.postViewMapperDefault(newPost)
        return resultDto
    }
    async changePost(dto: createdPostDtoType, postId: string):Promise<boolean>{
        const blog = await this.blogService.findById(dto.blogId)
        if(!blog) return false
        return this.postRepository.changePost(dto,postId,blog.name)
    }

    async delete(id: string):Promise<boolean>{
        return this.postRepository.deletePost(id)
    }
    async findPostById(id: string, userId?: string):Promise<postDtoResponseType | null>{
        const post = await this.postRepository.findPostById(id)
        if(!post) return null
        const likes = await this.postLikeService.getByPostId(id)
        return postHelper.postViewMapper(post,likes, userId)

    }

    async findPosts(params: paramsPostPaginatorType, userId?: string):Promise<viewAllPostsType>{
        const likes = await this.postLikeService.getAll()
        const post = await this.postRepository.findPosts(params, likes, userId)
        return post
    }
    async findPostsForBlog(params: paramsPostPaginatorType, blogId: string, userId?: string):Promise<viewAllPostsType | null>{
        const blog = await this.blogService.findById(blogId)
        if(!blog) return null
        const likes = await this.postLikeService.getAll()
        const posts = await this.postRepository.findPostsForBlog(params,blogId,likes, userId)
        return posts
    }

    async changeLikeStatus(userId: string, postId: string, likeStatus: LikeStatus, login: string) {
        const existReaction = await this.postLikeService.checkReaction(userId, postId)
        if(existReaction) return this.postLikeService.changeExistReaction(userId, postId, likeStatus)
        return this.postLikeService.addNewReaction(userId, postId,likeStatus,login)
    }   

    async deleteAll (){
        return this.postRepository.deleteAll()
    }
}