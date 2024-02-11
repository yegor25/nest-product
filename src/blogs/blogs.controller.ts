import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { createdDtoBlogType, paramsBlogPaginatorType } from "./blog.schema";
import { BlogService } from "./blog.service";
import { createdPosForBlogtDtoType, paramsPostPaginatorType } from "../posts/post.schema";
import { PostService } from "../posts/post.service";
import { BasicAuthGuard } from "../auth/guards/basic-auth.guard";



@Controller('blogs')
export class BlogController {
    constructor(
        protected blogService:BlogService,
        protected postService:PostService
        ){}

    @UseGuards(BasicAuthGuard)
    @Post()
    async createBlog(@Body() body: createdDtoBlogType){
        return this.blogService.create(body)
    }

    @UseGuards(BasicAuthGuard)
    @Post(':blogId/posts')
    async createPost(@Param('blogId') blogId: string, @Body() body: createdPosForBlogtDtoType){
        const post = await this.postService.createForBlog(body,blogId)
        if(!post) throw new NotFoundException();
        return post
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
    async findPostsForBlog(@Param('blogId') blogId: string, @Query() params: paramsPostPaginatorType & {userId: string}){
        const posts = await this.postService.findPostsForBlog(params, blogId,params.userId)
        if(!posts) throw new NotFoundException();
        return posts
    }
    @UseGuards(BasicAuthGuard)
    @Put(':id')
    @HttpCode(204)
    async changeBlog(@Param('id') blogId: string, @Body() body: createdDtoBlogType){
        const blog = await this.blogService.changeBlog(blogId,body)
        if(!blog) throw new NotFoundException();
        return;
    }
    @UseGuards(BasicAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteBlog(@Param('id') blogId: string){
        const deletedBlog = await this.blogService.deleteBlogById(blogId)
        if(!deletedBlog) throw new NotFoundException();
        return;
    }
}