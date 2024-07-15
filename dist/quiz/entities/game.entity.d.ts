import { Player } from "./player.entity";
import { AnswerStatus } from "./answer.entity";
import { GameQuestion } from "./gamePlayer.entity";
export declare enum GameStatus {
    PendingSecondPlayer = "PendingSecondPlayer",
    Active = "Active",
    Finished = "Finished"
}
export declare class Game {
    id: string;
    firstPlayerProgressId: string;
    secondPlayerProgressId: string;
    status: GameStatus;
    pairCreatedDate: string;
    startGameDate: string;
    finishGameDate: string;
    firstPlayerProgress: Player;
    secondPlayerProgress: Player;
    gameQuestion: GameQuestion;
}
export type gameViewType = {
    id: string;
    firstPlayerProgress: {
        answers: answersViewType[];
        player: playerViewType;
        score: number;
    };
    secondPlayerProgress: {
        answers: answersViewType[];
        player: playerViewType;
        score: number;
    } | null;
    questions: questionsViewType[] | null;
    status: GameStatus;
    pairCreatedDate: string;
    startGameDate: string | null;
    finishGameDate: string | null;
};
export type answersViewType = {
    questionId: string;
    answerStatus: AnswerStatus;
    addedAt: string;
};
export type playerViewType = {
    id: string;
    login: string;
};
export type questionsViewType = {
    id: string;
    body: string;
};
export type createdGameDbType = {
    id: string;
    firstPlayerProgressId: string;
    secondPlayerProgressId: string | null;
    pairCreatedDate: string;
    startGameDate: string | null;
    finishGameDate: string | null;
    gameQuestionId: string | null;
    status: GameStatus;
};
