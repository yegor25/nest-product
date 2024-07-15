import { Game, createdGameDbType } from "../quiz/entities/game.entity";
import { Repository } from "typeorm";
import { Player } from "../quiz/entities/player.entity";
export declare class PairGameRepository {
    protected gameRepository: Repository<Game>;
    protected playerRepo: Repository<Player>;
    constructor(gameRepository: Repository<Game>, playerRepo: Repository<Player>);
    checkExistGameForUser(): Promise<Game[]>;
    createNewPairs(userId: string, player: Player): Promise<createdGameDbType>;
    createNewPlayer(userId: string): Promise<any>;
    addSecondPlayerToGame(userId: string, player: Player): Promise<{
        player: any;
        modCount: number | undefined;
    }>;
    checkFreeGame(): Promise<boolean>;
    findGameByIdForNewGame(id: string): Promise<Game | null>;
    checkYourPair(pairId: string): Promise<Game | null>;
}
