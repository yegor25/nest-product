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
exports.CreatedQuestions = exports.PublishedStatus = exports.Questions = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Questions = class Questions {
};
exports.Questions = Questions;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Questions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Questions.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], Questions.prototype, "correctAnswers", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Questions.prototype, "published", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Questions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Questions.prototype, "updatedAt", void 0);
exports.Questions = Questions = __decorate([
    (0, typeorm_1.Entity)({ name: "Questions" })
], Questions);
var PublishedStatus;
(function (PublishedStatus) {
    PublishedStatus["all"] = "all";
    PublishedStatus["published"] = "published";
    PublishedStatus["notPublished"] = "notPublished";
})(PublishedStatus || (exports.PublishedStatus = PublishedStatus = {}));
class CreatedQuestions {
}
exports.CreatedQuestions = CreatedQuestions;
__decorate([
    (0, class_validator_1.MaxLength)(500),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CreatedQuestions.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], CreatedQuestions.prototype, "correctAnswers", void 0);
//# sourceMappingURL=quiz.entity.js.map