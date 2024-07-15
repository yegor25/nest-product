import { Response } from "express";
import { PairGameService } from "./pair-game.service";
import { PairGameRepository } from "./pair-game.repository";
export declare class PairGameQuizController {
    protected pairGameService: PairGameService;
    protected pairGameRepo: PairGameRepository;
    constructor(pairGameService: PairGameService, pairGameRepo: PairGameRepository);
    createGame(req: {
        user: {
            userId: string;
        };
    }, res: Response): Promise<void>;
    getById(param: {
        id: string;
    }, req: {
        user: {
            userId: string;
        };
    }, res: Response): Promise<void>;
}
