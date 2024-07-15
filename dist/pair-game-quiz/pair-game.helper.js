"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairGameHelper = void 0;
exports.pairGameHelper = {
    mapperGameForView(gameDTO, user, questions, player1, player2, user2) {
        const { id, startGameDate, pairCreatedDate, finishGameDate, status } = gameDTO;
        const { id: userId, login } = user;
        const res = {
            id,
            firstPlayerProgress: {
                answers: player1.answers ? player1.answers.map(a => ({ questionId: a.questionId, answerStatus: a.status, addedAt: a.addedAt })) : [],
                player: { id: userId, login },
                score: player1.score
            },
            secondPlayerProgress: !player2 ? null : {
                answers: player2.answers ? player2.answers.map(a => ({ questionId: a.questionId, answerStatus: a.status, addedAt: a.addedAt })) : [],
                player: { id: user2 ? user2.id : "", login: user2 ? user2.login : "" },
                score: player2.score
            },
            pairCreatedDate,
            startGameDate,
            finishGameDate,
            status,
            questions
        };
        return res;
    }
};
//# sourceMappingURL=pair-game.helper.js.map