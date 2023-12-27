import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog, createdDtoBlogType } from "./blog.schema";



@Injectable()
export class BlogRepository {
    constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>){}

    async create (dto: createdDtoBlogType):Promise<Blog>{
        const newBlog = new this.blogModel(dto)
        await newBlog.save()
        return newBlog
    }

    async findById(id: string):Promise<Blog | null>{
        const blog = await this.blogModel.findById(id)
        return blog
    }

    async deleteAll () {
        return this.blogModel.deleteMany({})
    }
}