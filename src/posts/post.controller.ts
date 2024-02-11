import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { createdPostDtoType, paramsPostPaginatorType } from "./post.schema";
import { CreatedCommentDto, paramsCommentsPaginatorType } from "../comments/comment.schema";
import { CommentService } from "../comments/comments.service";
import { UserService } from "../users/user.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth-guard";
import { User } from "../users/user.schema";
import { LikeStatus } from "../postLikes/like.schema";
import { BasicAuthGuard } from "src/auth/guards/basic-auth.guard";
import { Request } from "express";
import mongoose from "mongoose";



@Controller('posts')
export class PostController {
    constructor(
      protected postService: PostService,
      protected commentService: CommentService,
      protected userService: UserService
      ){}

@UseGuards(BasicAuthGuard)
 @Post()
   async createPost(@Body() body:createdPostDtoType){
    console.log("body", body)
    const data = await this.postService.create(body)
    return data
   }

   @Get()
   async findPosts(@Query() params: paramsPostPaginatorType & {userId?: string}){
    return this.postService.findPosts(params, params.userId)
   }

   @Get(':id')
   async findPostById(@Param('id') postId: string, @Query() data:{userId: string}){
    const post = await this.postService.findPostById(postId, data.userId)
    if(!post) throw new NotFoundException();
    return post
   }


   @UseGuards(BasicAuthGuard)
   @Put(':id')
   @HttpCode(204)
   async changePost(@Param('id') postId: string, @Body() body: createdPostDtoType){
    const post = await this.postService.changePost(body, postId)
    if(!post) throw new NotFoundException();

    return;
   }


   @UseGuards(BasicAuthGuard)
   @Delete(':id')
   @HttpCode(204)
   async deletePost(@Param('id') postId: string){
    const deletedPost = await this.postService.delete(postId)
    if(!deletedPost) throw new NotFoundException();
    return;
   }

   @UseGuards(JwtAuthGuard)
   @Post(':postId/comments')
   async createComment(@Body() body: CreatedCommentDto, @Param('postId') postId: string,  @Req() req: {user: {userId: string}}) {
      const comment = await this.commentService.createComment(postId,body,req.user.userId)
      if(!comment) throw new NotFoundException();
      return comment
  }
   @Get(':postId/comments')
   async findComments( @Param('postId') postId: string, @Query() params: paramsCommentsPaginatorType & {userId: string}) {
      const post = await this.postService.findPostById(postId)
      if(!post) throw new NotFoundException();
      return this.commentService.findCommentsByPostId(postId,{sortDirection: params.sortDirection,sortBy: params.sortBy,pageNumber: params.pageNumber,pageSize: params.pageSize},params.userId)

  }
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Put(':postId/like-status')
  async changeLikeStatus(@Param('postId') postId: string ,@Body() body: {likeStatus:LikeStatus}, @Req() req: {user: {userId: string, login: string}}){
   const post = await this.postService.findPostById(postId)
   if(!post) throw new NotFoundException();
   if(!Object.values(LikeStatus).includes(body.likeStatus)) throw new BadRequestException([{message: "invalid like-status", field: "likeStatus"}])
   return this.postService.changeLikeStatus(req.user.userId,postId,body.likeStatus,req.user.login)
  }
}