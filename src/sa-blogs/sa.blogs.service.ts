

import { Injectable } from "@nestjs/common";
import { SuperAdminBlogsRepository } from "./sa.blogs.repository";
import { createdDtoBlogType, paramsBlogPaginatorType } from "../blogs/blog.schema";
import { blogSqlDbType, responseDtoSqlBlogType } from "./sa.blogs.types";
import { PostService } from "src/posts/post.service";



@Injectable()
export class SuperAdminBlogService {
    constructor(
        protected suBlogsRepository: SuperAdminBlogsRepository,
        ){}

    async create(dto: createdDtoBlogType):Promise<blogSqlDbType>{
        return this.suBlogsRepository.create(dto)
    }
    async findBlogs(params: paramsBlogPaginatorType):Promise<responseDtoSqlBlogType>{
        return this.suBlogsRepository.findBlogs(params)
    }
    async findById(id: string):Promise<blogSqlDbType | null> {
        const blog = await this.suBlogsRepository.findById(id)
        if(!blog) return null
        return blog
    }
    async changeBlog(id: string, dto: createdDtoBlogType):Promise<boolean>{
        const blog = await this.suBlogsRepository.changeBlog(id, dto)
        if(!blog) return false
        return true
    }
    async deleteBlogById(id: string):Promise<boolean>{
        return this.suBlogsRepository.deleteBlogById(id)
    }
    // async deleteAll () {
    //     return this.blogRepository.deleteAll()
    // }
}