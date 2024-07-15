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
exports.Game = exports.GameStatus = void 0;
const typeorm_1 = require("typeorm");
const player_entity_1 = require("./player.entity");
const gamePlayer_entity_1 = require("./gamePlayer.entity");
var GameStatus;
(function (GameStatus) {
    GameStatus["PendingSecondPlayer"] = "PendingSecondPlayer";
    GameStatus["Active"] = "Active";
    GameStatus["Finished"] = "Finished";
})(GameStatus || (exports.GameStatus = GameStatus = {}));
let Game = class Game {
};
exports.Game = Game;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Game.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], Game.prototype, "firstPlayerProgressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], Game.prototype, "secondPlayerProgressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: GameStatus, default: GameStatus.PendingSecondPlayer }),
    __metadata("design:type", String)
], Game.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date().toISOString() }),
    __metadata("design:type", String)
], Game.prototype, "pairCreatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Game.prototype, "startGameDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Game.prototype, "finishGameDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_entity_1.Player, (p) => p.game),
    __metadata("design:type", player_entity_1.Player)
], Game.prototype, "firstPlayerProgress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_entity_1.Player, (p) => p.game, { nullable: true }),
    __metadata("design:type", player_entity_1.Player)
], Game.prototype, "secondPlayerProgress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gamePlayer_entity_1.GameQuestion, gm => gm.game),
    __metadata("design:type", gamePlayer_entity_1.GameQuestion)
], Game.prototype, "gameQuestion", void 0);
exports.Game = Game = __decorate([
    (0, typeorm_1.Entity)()
], Game);
//# sourceMappingURL=game.entity.js.map