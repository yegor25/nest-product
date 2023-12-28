import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { createdDtoBlogType, paramsBlogPaginatorType } from "./blog.schema";
import { BlogService } from "./blog.service";
import { createdPosForBlogtDtoType, paramsPostPaginatorType } from "../posts/post.schema";
import { PostService } from "../posts/post.service";



@Controller('blogs')
export class BlogController {
    constructor(
        protected blogService:BlogService,
        protected postService:PostService
        ){}
    @Post()
    async createBlog(@Body() body: createdDtoBlogType){
        return this.blogService.create(body)
    }
    @Post(':blogId/posts')
    async createPost(@Param('blogId') blogId: string, @Body() body: createdPosForBlogtDtoType){
        const post = await this.postService.createForBlog(body,blogId)
        if(!post) throw new NotFoundException();
        return;
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
    @Get(':blogId/posts')
    async findPostsForBlog(@Param('id') blogId: string, @Query() params: paramsPostPaginatorType){
        const posts = await this.postService.findPostsForBlog(params, blogId)
        if(!posts) throw new NotFoundException();
        return posts
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