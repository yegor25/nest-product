import { Injectable } from "@nestjs/common";
import { QuizRepository } from "./repositories/quiz.repository";
import { CreatedQuestions, paramsQuestionsPaginatorType } from "./quiz.entity";


@Injectable()
export class QuizService {
    constructor(
        protected quizRepo: QuizRepository
    ){}

    async create(dto: CreatedQuestions){
        return this.quizRepo.create(dto)
    }

    async findAll(params: paramsQuestionsPaginatorType){
        return this.quizRepo.findAllQuestions(params)
    }

    async updatePublis(id: string, publish: boolean){
        return this.quizRepo.updatePublish(id,publish)
    }

    async updateQuestion(id: string, dto: CreatedQuestions){
        return this.quizRepo.update(dto.body,dto.correctAnswers,id)
    }
    async deleteQuestion(id: string){
        return this.quizRepo.delete(id)
    }
}