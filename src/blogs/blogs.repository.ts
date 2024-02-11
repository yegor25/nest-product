import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog, blogItemsResponseType, createdDtoBlogType, dbBlogPaginatorType, paramsBlogPaginatorType, responseDtoBlogType } from "./blog.schema";
import { blogHelper } from "./blog.helper";



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
    async findBlogs(params: paramsBlogPaginatorType):Promise<responseDtoBlogType>{
        const parametres = blogHelper.blogParamsMapper(params)
        const skipCount = (parametres.pageNumber -1 ) * parametres.pageSize
        const blogs = await this.blogModel.find({
            name: {$regex: parametres.searchNameTerm, $options: "i"}
        })
        .sort({[parametres.sortBy] : parametres.sortDirection, "_id" : parametres.sortDirection})
        .skip(skipCount)
        .limit(parametres.pageSize)
        .lean()
        

       const totalCount = await this.blogModel.countDocuments({name: {$regex: parametres.searchNameTerm, $options: "i"}})
        return {
            pagesCount: Math.ceil(totalCount/+parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount,
            items: blogs.map(b => blogHelper.getViewBlog(b))
        }
    }

    async changeBlog(id: string, dto: createdDtoBlogType):Promise<Blog | null>{
        const blog = await this.blogModel.findByIdAndUpdate(
            id,
            {$set: {name: dto.name, websiteUrl: dto.websiteUrl,description: dto.description}}
        )
        return blog
    }
    async deleteById(id: string):Promise<boolean>{
        const deletedBlog = await this.blogModel.findByIdAndDelete(id)
        if(!deletedBlog) return false
        return true
        
    }

    async deleteAll ():Promise<any> {
        return this.blogModel.deleteMany({})
    }
}