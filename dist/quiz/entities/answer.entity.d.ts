import { Player } from "./player.entity";
export declare enum AnswerStatus {
    Correct = "Correct",
    Incorrect = "Incorrect"
}
export declare class Answers {
    id: string;
    status: AnswerStatus;
    questionId: string;
    addedAt: string;
    player: Player;
}
