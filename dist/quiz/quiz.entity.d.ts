import { SortDirection } from "typeorm";
import { GameQuestion } from "./entities/gamePlayer.entity";
export declare class Questions {
    id: string;
    body: string;
    correctAnswers: Array<string>;
    published: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    gameQuestion: GameQuestion;
}
export declare enum PublishedStatus {
    all = "all",
    published = "published",
    notPublished = "notPublished"
}
export declare class CreatedQuestions {
    body: string;
    correctAnswers: Array<string>;
}
export type paramsQuestionsPaginatorType = {
    pageNumber: string;
    pageSize: string;
    bodySearchTerm: string;
    sortBy: keyof Questions;
    sortDirection: SortDirection;
};
