
import { Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Put, Req } from "@nestjs/common";


@Controller('comments')
export class CommentController  {
    // @Get(":id")
    // async getById(@Param('id') commentId: string, @Req() req){
    //     const user = req.user
    //     const data = await QueryCommentsRepository.getCommentsById(commentId, user?._id.toString())
    //     if(!data) throw new NotFoundException();
    //     return data
    // } 
        
    // @Delete(':commentId')
    // @HttpCode(204)
    // async deleteComment(@Param('commentId') commentId: string, @Req() req){
    //     const data = await QueryCommentsRepository.getCommentsById(req.params.commentId, req.user?._id.toString())
    //     if(!data) throw new NotFoundException();
    //     const user = req.user
    //     const result = await commentService.deleteComment(commentId,user?._id.toString() as string)
    //     if(!result) throw new ForbiddenException();
    //     return
    // }

    // @Put(':commentId')
    // @HttpCode(204)
    // async changeComment(@Param('commentId') commentId: string, @Req() req) {
    //     const content = req.body.content
    //     const data = await QueryCommentsRepository.getCommentsById(req.params.commentId, req.user?._id.toString())
    //     if(!data) throw new NotFoundException();
    //     const user = req.user
    //     const result = await commentService.updateComment(commentId,user?._id.toString() as string,content)
    //     if(!result) throw new ForbiddenException();
    //     return
    // }
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
