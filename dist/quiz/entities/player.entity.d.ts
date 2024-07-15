import { Users } from "../../users/entities/user.entity";
import { Answers } from "./answer.entity";
import { Game } from "./game.entity";
export declare class Player {
    id: string;
    score: number;
    userId: string;
    user: Users;
    answers: Answers[];
    game: Game;
}
