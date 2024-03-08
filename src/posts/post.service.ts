import { Injectable } from "@nestjs/common";
import { PostRepository } from "./post.repository";
import { createdPosForBlogtDtoType, createdPostDtoType, paramsPostPaginatorType, postDtoResponseType, postSqlDbType, updatedPostDtoType, viewAllPostsType } from "./post.schema";
import { postHelper } from "./postHelper";
import { BlogService } from "../blogs/blog.service";
import { PostLikeService } from "../postLikes/postLike.service";
import { LikeStatus } from "../postLikes/like.schema";
import { SuperAdminBlogService } from "../sa-blogs/sa.blogs.service";
import { PostSqlRepository } from "./post.sqlRepository";


@Injectable()
export class PostService {
    constructor(
        protected blogService: BlogService,
        protected postLikeService: PostLikeService,
        protected saBlogService: SuperAdminBlogService,
        protected postSqlRepository: PostSqlRepository,
        protected postRepository: PostRepository
        ){}

    async create(dto: createdPostDtoType):Promise<postDtoResponseType | null>{
        const blog = await this.blogService.findById(dto.blogId)
        if(!blog) return null
        const newPost = await this.postSqlRepository.create(dto, blog?.name as string)
        const resultDto = postHelper.postViewMapperDefault(newPost)
        return resultDto
    }
    async createForBlog(dto: createdPosForBlogtDtoType, blogId: string):Promise<postDtoResponseType | null>{
        const blog = await this.saBlogService.findById(blogId)
        if(!blog) return null
        const newPost = await this.postSqlRepository.createForBlog(dto, blogId, blog.name)
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
        const post = await this.postSqlRepository.findById(id, userId)
        if(!post) return null
        // const likes = await this.postLikeService.getByPostId(id)
        // return postHelper.postViewMapper(post,likes, userId)
        return  postHelper.postViewMapperFromSql(post)
    }

    async findPosts(params: paramsPostPaginatorType, userId?: string):Promise<viewAllPostsType>{
        const likes = await this.postLikeService.getAll()
        const post = await this.postRepository.findPosts(params, likes, userId)
        return post
    }
    async findPostsForBlog(params: paramsPostPaginatorType, blogId: string, userId?: string):Promise<viewAllPostsType | null>{
        const blog = await this.blogService.findById(blogId)
        if(!blog) return null
        // const posts = await this.postRepository.findPostsForBlog(params,blogId,likes, userId)
        const posts = await this.postSqlRepository.findPostsForBlog(params, blogId, userId)
        return posts
    }

    async changeLikeStatus(userId: string, postId: string, likeStatus: LikeStatus, login: string) {
        const existReaction = await this.postLikeService.checkReaction(userId, postId)
        if(existReaction) return this.postLikeService.changeExistReaction(userId, postId, likeStatus)
        return this.postLikeService.addNewReaction(userId, postId,likeStatus,login)
    }   
    async changeByBlogId(blogId: string, postId: string, dto: updatedPostDtoType):Promise<boolean>{
        return this.postSqlRepository.changeByBlogId(blogId,postId,dto)
    }
    async deleteByBlogId(postId: string, blogId: string):Promise<boolean>{
        return this.postSqlRepository.deleteByBlogId(postId, blogId)
    }

    async deleteAll ():Promise<any>{
        return this.postRepository.deleteAll()
    }
}