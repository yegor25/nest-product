import { Response } from "express";
import { PairGameService } from "./pair-game.service";
export declare class PairGameQuizController {
    protected pairGameService: PairGameService;
    constructor(pairGameService: PairGameService);
    createGame(req: {
        user: {
            userId: string;
        };
    }, res: Response): Promise<void>;
}
