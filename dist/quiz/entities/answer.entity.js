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
exports.Answers = exports.AnswerStatus = void 0;
const typeorm_1 = require("typeorm");
const player_entity_1 = require("./player.entity");
var AnswerStatus;
(function (AnswerStatus) {
    AnswerStatus["Correct"] = "Correct";
    AnswerStatus["Incorrect"] = "Incorrect";
})(AnswerStatus || (exports.AnswerStatus = AnswerStatus = {}));
let Answers = class Answers {
};
exports.Answers = Answers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Answers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: AnswerStatus }),
    __metadata("design:type", String)
], Answers.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], Answers.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date().toISOString() }),
    __metadata("design:type", String)
], Answers.prototype, "addedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_entity_1.Player, p => p.answers),
    __metadata("design:type", player_entity_1.Player)
], Answers.prototype, "player", void 0);
exports.Answers = Answers = __decorate([
    (0, typeorm_1.Entity)()
], Answers);
//# sourceMappingURL=answer.entity.js.map