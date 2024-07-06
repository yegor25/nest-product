import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
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
    async update(@Param() id: string, @Body() body: CreatedQuestions){
        const mod = await this.quizService.updateQuestion(id,body)
        if(!mod){
            throw new NotFoundException()
        }
        return
    }

    @UseGuards(BasicAuthGuard)
    @Put("quiz/questions/:id/publish")
    @HttpCode(204)
    async updatePublish(@Param() id: string, @Body() body: {published: boolean}){
        const mod = await this.quizService.updatePublis(id, body.published)
        if(!mod){
            throw new NotFoundException()
        }
        return 
    }

    @UseGuards(BasicAuthGuard)
    @Delete("quiz/questions/:id")
    @HttpCode(204)
    async deleteQuestion(@Param() id: string){
        const del = await this.quizService.deleteQuestion(id)
        if(!del){
            throw new NotFoundException()
        }
        return
    }
}

//