import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { PostService } from "./post.service";
import { createdPostDtoType, paramsPostPaginatorType } from "./post.schema";



@Controller('posts')
export class PostController {
    constructor(protected postService: PostService){}

 @Post()
   async createPost(@Body() body:createdPostDtoType){
    return this.postService.create(body)
   }

   @Get()
   async findPosts(@Query() params: paramsPostPaginatorType){
    return this.postService.findPosts(params)
   }

   @Get(':id')
   async findPostById(@Param('id') postId: string){
    const post = await this.postService.findPostById(postId)
    if(!post) throw new NotFoundException();
    return post
   }

   @Delete(':id')
   @HttpCode(204)
   async deletePost(@Param('id') postId: string){
    const deletedPost = await this.postService.delete(postId)
    if(!deletedPost) throw new NotFoundException();
    return;
   }
}