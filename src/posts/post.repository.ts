import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post, createdPostDtoType } from "./post.schema";
import { Model } from "mongoose";


@Injectable()

export class PostRepository {
    constructor(@InjectModel(Post.name) private postModel:Model<Post>){}

    async create(dto: createdPostDtoType):Promise<Post>{
        const newPost = new this.postModel(dto)
        await newPost.save()
        return newPost
    }

    async deletePost(id: string):Promise<boolean>{
        const deletedPost = await this.postModel.findByIdAndDelete(id)
        if(!deletedPost) return false
        return true
    }
    async findPostById(id: string):Promise<Post | null>{
        const post = await this.postModel.findById(id)
        if(!post) return null
        return post
    }
}