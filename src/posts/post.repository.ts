import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post, createdPosForBlogtDtoType, createdPostDtoType, paramsPostPaginatorType, viewAllPostsType } from "./post.schema";
import { Model } from "mongoose";
import { postHelper } from "./postHelper";


@Injectable()

export class PostRepository {
    constructor(@InjectModel(Post.name) private postModel:Model<Post>){}

    async create(dto: createdPostDtoType, blogName: string):Promise<Post>{
        const data = {...dto, blogName}
        const newPost = new this.postModel(data)
        await newPost.save()
        return newPost
    }
    async createForBlog(dto: createdPosForBlogtDtoType, blogId: string,blogName: string):Promise<Post>{
        const data = {...dto, blogName, blogId}
        const newPost = new this.postModel(data)
        await newPost.save()
        return newPost
    }

    async changePost(dto: createdPostDtoType, id: string,blogName: string):Promise<boolean>{
        const post = await this.postModel.findByIdAndUpdate(
            id,
            {$set: {title: dto.title,shortDescription: dto.shortDescription,content: dto.content, blogId: dto.blogId, blogName: blogName}}

        )
        if(!post) return false
        return true
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

    async findPosts(params: paramsPostPaginatorType, userId?: string): Promise<viewAllPostsType> {
        const parametres = postHelper.postParamsMapper(params)
        const skipcount = (parametres.pageNumber - 1) * parametres.pageSize
        const user = userId ? userId : null
        const res = await this.postModel.find({})
            .sort({ [parametres.sortBy]: parametres.sortDirection, "_id":parametres.sortDirection })
            .skip(skipcount)
            .limit(parametres.pageSize)

        const totalCount = await this.postModel.countDocuments({})
        const totalResult = res.map((el) => postHelper.postViewMapper(el, el.getDefaultLikes()))
        const query:viewAllPostsType = {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
                page: +parametres.pageNumber,
                pageSize: +parametres.pageSize,
                totalCount,
            items: totalResult
        }
        return query
    }
    async findPostsForBlog(params: paramsPostPaginatorType, blogId: string, userId?: string): Promise<viewAllPostsType> {
        const parametres = postHelper.postParamsMapper(params)
        const skipcount = (parametres.pageNumber - 1) * parametres.pageSize
        const user = userId ? userId : null
        const res = await this.postModel.find({blogId})
            .sort({ [parametres.sortBy]: parametres.sortDirection, "_id":parametres.sortDirection })
            .skip(skipcount)
            .limit(parametres.pageSize)

        const totalCount = await this.postModel.countDocuments({blogId})
        const totalResult = res.map((el) => postHelper.postViewMapper(el, el.getDefaultLikes()))
        const query:viewAllPostsType = {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
                page: +parametres.pageNumber,
                pageSize: +parametres.pageSize,
                totalCount,
            items: totalResult
        }
        return query
    }

    async deleteAll () {
        return this.postModel.deleteMany()
    }
}