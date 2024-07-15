import { PairGameRepository } from "./pair-game.repository";
import { gameViewType } from "../quiz/entities/game.entity";
import { UserSqlRepository } from "../users/userSql.repository";
export declare class PairGameService {
    protected pairGameRepo: PairGameRepository;
    protected userRepo: UserSqlRepository;
    constructor(pairGameRepo: PairGameRepository, userRepo: UserSqlRepository);
    createGame(userId: string): Promise<gameViewType | null | boolean>;
    createNewPlayer(userId: string): Promise<any>;
}
