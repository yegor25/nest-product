import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
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


   @Put(':id')
   @HttpCode(204)
   async changePost(@Param('id') postId: string, @Body() body: createdPostDtoType){
    const post = await this.postService.changePost(body, postId)
    if(!post) throw new NotFoundException();

    return;
   }


   @Delete(':id')
   @HttpCode(204)
   async deletePost(@Param('id') postId: string){
    const deletedPost = await this.postService.delete(postId)
    if(!deletedPost) throw new NotFoundException();
    return;
   }
}