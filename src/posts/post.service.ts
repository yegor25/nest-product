import { Injectable } from "@nestjs/common";
import { PostRepository } from "./post.repository";
import { createdPostDtoType, paramsPostPaginatorType, postDtoResponseType, viewAllPostsType } from "./post.schema";
import { postHelper } from "./postHelper";
import { BlogService } from "../blogs/blog.service";


@Injectable()
export class PostService {
    constructor(
        protected postRepository: PostRepository,
        protected blogService: BlogService
        ){}

    async create(dto: createdPostDtoType):Promise<postDtoResponseType>{
        const blog = await this.blogService.findById(dto.blogId)
        const newPost = await this.postRepository.create(dto, blog?.name as string)
        const likes = newPost.getDefaultLikes()
        const resultDto = postHelper.postViewMapper(newPost,likes)
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
    async findPostById(id: string):Promise<postDtoResponseType | null>{
        const post = await this.postRepository.findPostById(id)
        if(!post) return null
        const likes = post.getDefaultLikes()
        return postHelper.postViewMapper(post,likes)

    }

    async findPosts(params: paramsPostPaginatorType):Promise<viewAllPostsType>{
        const post = await this.postRepository.findPosts(params)
        return post
    }

    async deleteAll (){
        return this.postRepository.deleteAll()
    }
}