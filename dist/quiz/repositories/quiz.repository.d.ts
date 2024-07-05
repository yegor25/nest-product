import { CreatedQuestions, Questions, paramsQuestionsPaginatorType } from "../quiz.entity";
import { Repository } from "typeorm";
export declare class QuizRepository {
    protected questionRepo: Repository<Questions>;
    constructor(questionRepo: Repository<Questions>);
    create(dto: CreatedQuestions): Promise<any>;
    delete(id: string): Promise<boolean>;
    update(body: string, correctAnswers: string[], id: string): Promise<boolean>;
    updatePublish(id: string, publish: boolean): Promise<boolean>;
    findAllQuestions(params: paramsQuestionsPaginatorType): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: Questions[];
    }>;
}
