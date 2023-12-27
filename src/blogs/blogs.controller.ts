import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { createdDtoBlogType, paramsBlogPaginatorType } from "./blog.schema";
import { BlogService } from "./blog.service";



@Controller('blogs')
export class BlogController {
    constructor(protected blogService:BlogService){}
    @Post()
    async createBlog(@Body() body: createdDtoBlogType){
        return this.blogService.create(body)
    }
    @Get()
    async findBlogs(@Query()params:paramsBlogPaginatorType){
        return this.blogService.findBlogs(params)
    }
    @Get(':id')
    async findBlogById(@Param('id') blogId: string){
        const blog = await this.blogService.findById(blogId)
        if(!blog) throw new NotFoundException();
        return blog
    }
    @Put(':id')
    @HttpCode(204)
    async changeBlog(@Param('id') blogId: string, @Body() body: createdDtoBlogType){
        const blog = await this.blogService.changeBlog(blogId,body)
        if(!blog) throw new NotFoundException();
        return;
    }
    @Delete(':id')
    @HttpCode(204)
    async deleteBlog(@Param('id') blogId: string){
        const deletedBlog = await this.blogService.deleteBlogById(blogId)
        if(!deletedBlog) throw new NotFoundException();
        return;
    }
}