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
exports.PairGameQuizController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth-guard");
const pair_game_service_1 = require("./pair-game.service");
const pair_game_repository_1 = require("./pair-game.repository");
let PairGameQuizController = class PairGameQuizController {
    constructor(pairGameService, pairGameRepo) {
        this.pairGameService = pairGameService;
        this.pairGameRepo = pairGameRepo;
    }
    async createGame(req, res) {
        const userId = req.user.userId;
        const newGame = await this.pairGameService.createGame(userId);
        if (!newGame) {
            throw new common_1.ForbiddenException();
        }
        res.send(newGame);
    }
    async getById(param, req, res) {
        const userId = req.user.userId;
        const game = await this.pairGameRepo.checkYourPair(param.id);
        if (!game) {
            res.sendStatus(404);
            return;
        }
        if (game.firstPlayerProgress.userId !== userId || game.secondPlayerProgress.userId !== userId) {
            res.sendStatus(403);
            return;
        }
        res.sendStatus(204);
    }
};
exports.PairGameQuizController = PairGameQuizController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("connection"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PairGameQuizController.prototype, "createGame", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PairGameQuizController.prototype, "getById", null);
exports.PairGameQuizController = PairGameQuizController = __decorate([
    (0, common_1.Controller)("pair-game-quiz/pairs"),
    __metadata("design:paramtypes", [pair_game_service_1.PairGameService,
        pair_game_repository_1.PairGameRepository])
], PairGameQuizController);
//# sourceMappingURL=pair-game.controller.js.map