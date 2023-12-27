import { Injectable } from "@nestjs/common";
import { BlogRepository } from "./blogs.repository";
import { blogItemsResponseType, createdDtoBlogType } from "./blog.schema";
import { blogHelper } from "./blog.helper";



@Injectable()
export class BlogService {
    constructor(protected blogRepository: BlogRepository){}

    async create(dto: createdDtoBlogType):Promise<blogItemsResponseType>{
        const blog = await this.blogRepository.create(dto)
        return blogHelper.getViewBlog(blog)
    }
    async findById(id: string):Promise<blogItemsResponseType | null> {
        const blog = await this.blogRepository.findById(id)
        if(!blog) return null
        return blogHelper.getViewBlog(blog)
    }
    async deleteAll () {
        return this.blogRepository.deleteAll()
    }
}