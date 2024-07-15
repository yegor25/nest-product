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
exports.Player = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const answer_entity_1 = require("./answer.entity");
const game_entity_1 = require("./game.entity");
let Player = class Player {
};
exports.Player = Player;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Player.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Player.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], Player.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, u => u.players, { onDelete: "CASCADE" }),
    __metadata("design:type", user_entity_1.Users)
], Player.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.Answers, a => a.player),
    __metadata("design:type", Array)
], Player.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => game_entity_1.Game, g => g),
    __metadata("design:type", game_entity_1.Game)
], Player.prototype, "game", void 0);
exports.Player = Player = __decorate([
    (0, typeorm_1.Entity)()
], Player);
//# sourceMappingURL=player.entity.js.map