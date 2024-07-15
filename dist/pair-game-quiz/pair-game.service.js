"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairGameService = void 0;
const common_1 = require("@nestjs/common");
const pair_game_repository_1 = require("./pair-game.repository");
const userSql_repository_1 = require("../users/userSql.repository");
const pair_game_helper_1 = require("./pair-game.helper");
let PairGameService = class PairGameService {
    constructor(pairGameRepo, userRepo) {
        this.pairGameRepo = pairGameRepo;
        this.userRepo = userRepo;
    }
    async createGame(userId) {
        const existUserInGame = await this.pairGameRepo.checkExistGameForUser();
        const ourUser = existUserInGame.find((u) => (u.firstPlayerProgress && u.firstPlayerProgress.userId === userId) ||
            (u.secondPlayerProgress && u.secondPlayerProgress.userId === userId));
        if (ourUser) {
            return null;
        }
        const freeGame = await this.pairGameRepo.checkFreeGame();
        if (freeGame) {
            const newPlayer = await this.createNewPlayer(userId);
            const newGame = await this.pairGameRepo.addSecondPlayerToGame(userId, newPlayer);
            if (newGame.modCount === 1) {
                console.log("newedxwecx", newGame.player);
                const game = await this.pairGameRepo.findGameByIdForNewGame(newGame.player.id);
                console.log("result", game);
                if (!game)
                    return null;
                const firsUser = await this.userRepo.findById(game.firstPlayerProgress.userId);
                const secondUser = await this.userRepo.findById(game.secondPlayerProgress.userId);
                return {
                    id: game?.id,
                    firstPlayerProgress: {
                        answers: [],
                        player: {
                            id: firsUser.id,
                            login: firsUser.login
                        },
                        score: game.firstPlayerProgress.score
                    },
                    secondPlayerProgress: {
                        answers: [],
                        player: {
                            id: secondUser.id,
                            login: secondUser.login
                        },
                        score: game.secondPlayerProgress.score
                    },
                    status: game.status,
                    pairCreatedDate: game.pairCreatedDate,
                    startGameDate: game.startGameDate,
                    finishGameDate: game.finishGameDate,
                    questions: []
                };
            }
            return null;
        }
        else {
            const newPlayer = await this.createNewPlayer(userId);
            const newPairs = await this.pairGameRepo.createNewPairs(userId, newPlayer);
            const firstUser = await this.userRepo.findById(userId);
            if (!firstUser)
                return null;
            return pair_game_helper_1.pairGameHelper.mapperGameForView(newPairs, firstUser, null, newPlayer, null, null);
        }
    }
    async createNewPlayer(userId) {
        return this.pairGameRepo.createNewPlayer(userId);
    }
};
exports.PairGameService = PairGameService;
exports.PairGameService = PairGameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pair_game_repository_1.PairGameRepository,
        userSql_repository_1.UserSqlRepository])
], PairGameService);
//# sourceMappingURL=pair-game.service.js.map