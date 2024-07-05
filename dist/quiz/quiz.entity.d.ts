import { SortDirection } from "typeorm";
export declare class Questions {
    id: string;
    body: string;
    correctAnswers: Array<string>;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
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
