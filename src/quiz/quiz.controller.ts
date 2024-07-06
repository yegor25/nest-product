import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { BasicAuthGuard } from "../auth/guards/basic-auth.guard";
import { CreatedQuestions, paramsQuestionsPaginatorType } from "./quiz.entity";

@Controller("sa")
export class SuperAdminQuizController {
    constructor(
        protected quizService: QuizService
    ) {}

    @UseGuards(BasicAuthGuard)
    @Get("quiz/questions")
    async findAll(@Query() query: paramsQuestionsPaginatorType){
        return this.quizService.findAll(query)
    }

    @UseGuards(BasicAuthGuard)
    @Post("quiz/questions")
    async create(@Body() body: CreatedQuestions){
        return this.quizService.create(body)
    }

    @UseGuards(BasicAuthGuard)
    @Put("quiz/questions/:id")
    @HttpCode(204)
    async update(@Param() param: {id: string} , @Body() body: CreatedQuestions){
        const mod = await this.quizService.updateQuestion(param.id,body)
        console.log("mod",mod)
        if(!mod){
            throw new NotFoundException()
        }
        return
    }

    @UseGuards(BasicAuthGuard)
    @Put("quiz/questions/:id/publish")
    @HttpCode(204)
    async updatePublish(@Param() param: {id: string} , @Body() body: {published: boolean}){
        if(typeof body.published !== "boolean"){
            throw new BadRequestException([{message: "invalid", field: "published"}])
        }
        const mod = await this.quizService.updatePublis(param.id, body.published)
        if(!mod){
            throw new NotFoundException()
        }
        return 
    }

    @UseGuards(BasicAuthGuard)
    @Delete("quiz/questions/:id")
    @HttpCode(204)
    async deleteQuestion(@Param() param: {id:string} ){
        const del = await this.quizService.deleteQuestion(param.id)
        if(!del){
            throw new NotFoundException()
        }
        return
    }
}

//