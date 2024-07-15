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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairGameRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const game_entity_1 = require("../quiz/entities/game.entity");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("../quiz/entities/player.entity");
let PairGameRepository = class PairGameRepository {
    constructor(gameRepository, playerRepo) {
        this.gameRepository = gameRepository;
        this.playerRepo = playerRepo;
    }
    async checkExistGameForUser() {
        const game = await this.gameRepository.find({
            relations: {
                firstPlayerProgress: true,
                secondPlayerProgress: true
            },
            where: {
                status: (game_entity_1.GameStatus.Active, game_entity_1.GameStatus.PendingSecondPlayer)
            }
        });
        return game;
    }
    async createNewPairs(userId, player) {
        const newGame = await this.gameRepository.createQueryBuilder()
            .insert()
            .into(game_entity_1.Game)
            .values({
            firstPlayerProgress: player,
            firstPlayerProgressId: userId,
        })
            .returning("*")
            .execute();
        return newGame.raw[0];
    }
    async createNewPlayer(userId) {
        const newPlayer = await this.playerRepo.createQueryBuilder()
            .insert()
            .into(player_entity_1.Player)
            .values({ userId })
            .returning("*")
            .execute();
        return newPlayer.raw[0];
    }
    async addSecondPlayerToGame(userId, player) {
        const secondPlayer = await this.gameRepository.createQueryBuilder()
            .update(game_entity_1.Game)
            .set({ secondPlayerProgress: player, secondPlayerProgressId: userId, startGameDate: new Date().toISOString(), status: game_entity_1.GameStatus.Active })
            .where("status = :status", { status: game_entity_1.GameStatus.PendingSecondPlayer })
            .returning("*")
            .execute();
        return { player: secondPlayer.raw[0], modCount: secondPlayer.affected };
    }
    async checkFreeGame() {
        const game = await this.gameRepository.findOne({ where: { status: game_entity_1.GameStatus.PendingSecondPlayer } });
        if (game)
            return true;
        return false;
    }
    async findGameByIdForNewGame(id) {
        const game = await this.gameRepository.findOne({
            relations: {
                firstPlayerProgress: true,
                secondPlayerProgress: true
            },
            where: { id },
        });
        return game;
    }
};
exports.PairGameRepository = PairGameRepository;
exports.PairGameRepository = PairGameRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_entity_1.Game)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PairGameRepository);
//# sourceMappingURL=pair-game.repository.js.map