import { Game } from "./game.entity";
import { Questions } from "../quiz.entity";
export declare class GameQuestion {
    id: number;
    question: Questions[];
    game: Game[];
    order: number;
}
