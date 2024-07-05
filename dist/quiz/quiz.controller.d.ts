import { QuizService } from "./quiz.service";
import { CreatedQuestions, paramsQuestionsPaginatorType } from "./quiz.entity";
export declare class SuperAdminQuizController {
    protected quizService: QuizService;
    constructor(quizService: QuizService);
    findAll(query: paramsQuestionsPaginatorType): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: import("./quiz.entity").Questions[];
    }>;
    create(body: CreatedQuestions): Promise<any>;
    update(id: string, body: CreatedQuestions): Promise<void>;
    updatePublish(id: string, body: {
        published: boolean;
    }): Promise<void>;
    deleteQuestion(id: string): Promise<void>;
}
