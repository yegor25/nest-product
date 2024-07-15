import { userSqlDbType } from "../users/user.schema";
import { createdGameDbType, gameViewType, questionsViewType } from "../quiz/entities/game.entity";
import { Player } from "../quiz/entities/player.entity";
export declare const pairGameHelper: {
    mapperGameForView(gameDTO: createdGameDbType, user: userSqlDbType, questions: questionsViewType[] | null, player1: Player, player2: Player | null, user2: userSqlDbType | null): gameViewType;
};
