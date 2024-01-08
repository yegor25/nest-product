
import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Put, Query, Req, UseGuards } from "@nestjs/common";
import { CommentService } from "./comments.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth-guard";
import { CreatedCommentDto } from "./comment.schema";
import { LikeStatus } from "../postLikes/like.schema";


@Controller('comments')
export class CommentController  {

    constructor(
        private commentService: CommentService
    ){}

    @Get(":id")
    async getById(@Param('id') commentId: string,@Query() params:{userId: string}){
        const data = await this.commentService.findById(commentId,params.userId)
        if(!data) throw new NotFoundException();
        return data
    } 
        
    @UseGuards(JwtAuthGuard)
    @Delete(':commentId')
    @HttpCode(204)
    async deleteComment(@Param('commentId') commentId: string, @Req() req: {user: {userId: string}}){
        const data = await this.commentService.findById(commentId)
        if(!data) throw new NotFoundException();
        const userId = req.user.userId
        const result = await this.commentService.deleteComment(commentId,userId)
        if(!result) throw new ForbiddenException();
        return
    }

    @UseGuards(JwtAuthGuard)
    @Put(':commentId')
    @HttpCode(204)
    async changeComment(@Body() body: CreatedCommentDto,@Param('commentId') commentId: string, @Req() req: {user: {userId: string}}) {
        const content = body.content
        const userId = req.user.userId
        const data = await this.commentService.findById(commentId)
        if(!data) throw new NotFoundException();
        const result = await this.commentService.updateComment(commentId,userId,content)
        if(!result) throw new ForbiddenException();
        return
    }

    @UseGuards(JwtAuthGuard)
    @Put(':commentId/like-status')
    @HttpCode(204)
    async changeLikeStatus(@Param('commentId') commentId: string, @Body() body: {likeStatus:LikeStatus}, @Req() req: {user: {userId: string, login: string}}) {
        const comment = await this.commentService.findById(commentId)
        if(!comment) throw new NotFoundException();
        if(!Object.values(LikeStatus).includes(body.likeStatus)) throw new BadRequestException([{message: "invalid like-status", field: "likeStatus"}])
        return this.commentService.updateLikeStatus(body.likeStatus,req.user.userId,commentId)
    }
}
