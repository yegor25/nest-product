
import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Put, Req, UseGuards } from "@nestjs/common";
import { CommentService } from "./comments.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth-guard";
import { CreatedCommentDto } from "./comment.schema";


@Controller('comments')
export class CommentController  {

    constructor(
        private commentService: CommentService
    ){}

    @Get(":id")
    async getById(@Param('id') commentId: string){
        const data = await this.commentService.findById(commentId)
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
    // @Put(':commentId/like-status')
    // @HttpCode(204)
    // async changeLikeStatus(@Param('commentId') commentId: string, @Req() req) {
    //     const status = req.body.likeStatus
    //     const data = await QueryCommentsRepository.getCommentsById(req.params.commentId, req.user?._id.toString())
    //     if(!data) throw new NotFoundException();
    //     const user = req.user
    //     const result = await commentService.updateLikeStatus(status,user?._id.toString() as string,commentId)
    //     if(!result) throw new ForbiddenException();
    //     return
    // }
}
