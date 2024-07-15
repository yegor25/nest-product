import { userSqlDbType } from "../users/user.schema";
import { answersViewType, createdGameDbType, gameViewType, questionsViewType } from "../quiz/entities/game.entity";
import { Player } from "../quiz/entities/player.entity";


export const pairGameHelper = {
    mapperGameForView(gameDTO: createdGameDbType, user: userSqlDbType, questions: questionsViewType[] | null, player1: Player, player2: Player | null, user2: userSqlDbType | null): gameViewType  {
        const {id,startGameDate,pairCreatedDate,finishGameDate, status} = gameDTO
        const {id: userId,login} = user
        const res:gameViewType = {
            id,
            firstPlayerProgress: {
                answers: player1.answers ?  player1.answers.map( a => ({questionId: a.questionId, answerStatus: a.status, addedAt: a.addedAt})) : [],
                player: {id: userId, login},
                score: player1.score
            },
            secondPlayerProgress: !player2 ? null : {
                answers: player2.answers ? player2.answers.map( a => ({questionId: a.questionId, answerStatus: a.status, addedAt: a.addedAt})) : [],
                player: {id: user2 ? user2.id : "", login: user2 ? user2.login : ""},
                score: player2.score
            },
            pairCreatedDate,
            startGameDate,
            finishGameDate,
            status,
            questions

        }
        return res
    }
}