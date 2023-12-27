import { Injectable } from "@nestjs/common";
import { BlogRepository } from "./blogs.repository";
import { blogItemsResponseType, createdDtoBlogType, paramsBlogPaginatorType, responseDtoBlogType } from "./blog.schema";
import { blogHelper } from "./blog.helper";



@Injectable()
export class BlogService {
    constructor(protected blogRepository: BlogRepository){}

    async create(dto: createdDtoBlogType):Promise<blogItemsResponseType>{
        const blog = await this.blogRepository.create(dto)
        return blogHelper.getViewBlog(blog)
    }
    async findBlogs(params: paramsBlogPaginatorType):Promise<responseDtoBlogType>{
        const blogs = await this.blogRepository.findBlogs(params)
        return blogs
    }
    async findById(id: string):Promise<blogItemsResponseType | null> {
        const blog = await this.blogRepository.findById(id)
        if(!blog) return null
        return blogHelper.getViewBlog(blog)
    }
    async changeBlog(id: string, dto: createdDtoBlogType):Promise<boolean>{
        const blog = await this.blogRepository.changeBlog(id, dto)
        if(!blog) return false
        return true
    }
    async deleteAll () {
        return this.blogRepository.deleteAll()
    }
}