import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { createdDtoBlogType } from "./blog.schema";
import { BlogService } from "./blog.service";



@Controller('blogs')
export class BlogController {
    constructor(protected blogService:BlogService){}
    @Post()
    async createBlog(@Body() body: createdDtoBlogType){
        return this.blogService.create(body)
    }
    @Get(':id')
    async findBlogById(@Param(':id') blogId: string){
        const blog = await this.blogService.findById(blogId)
        if(!blog) throw new NotFoundException();
        return blog
    }
}