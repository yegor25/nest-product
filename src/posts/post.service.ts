import { Injectable } from "@nestjs/common";
import { PostRepository } from "./post.repository";
import { createdPostDtoType, postDtoResponseType } from "./post.schema";
import { postHelper } from "./postHelper";


@Injectable()
export class PostService {
    constructor(protected postRepository: PostRepository){}

    async create(dto: createdPostDtoType):Promise<postDtoResponseType>{
        const newPost = await this.postRepository.create(dto)
        const likes = newPost.getDefaultLikes()
        const resultDto = postHelper.postViewMapper(newPost,likes)
        return resultDto
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
}