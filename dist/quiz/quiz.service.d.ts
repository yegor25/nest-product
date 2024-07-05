import { QuizRepository } from "./repositories/quiz.repository";
import { CreatedQuestions, paramsQuestionsPaginatorType } from "./quiz.entity";
export declare class QuizService {
    protected quizRepo: QuizRepository;
    constructor(quizRepo: QuizRepository);
    create(dto: CreatedQuestions): Promise<any>;
    findAll(params: paramsQuestionsPaginatorType): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: import("./quiz.entity").Questions[];
    }>;
    updatePublis(id: string, publish: boolean): Promise<boolean>;
    updateQuestion(id: string, dto: CreatedQuestions): Promise<any>;
    deleteQuestion(id: string): Promise<boolean>;
}
