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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const confirmationData_1 = require("./confirmationData");
const securityDevices_entity_1 = require("../../securityDevices/securityDevices.entity");
const token_entity_1 = require("../../tokens/token.entity");
const blog_entity_1 = require("../../blogs/blog.entity");
const comment_entity_1 = require("../../comments/comment.entity");
const postLike_entity_1 = require("../../postLikes/postLike.entity");
const player_entity_1 = require("../../quiz/entities/player.entity");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid" }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "passwordSalt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isActiveAccount", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => confirmationData_1.ConfirmationData, c => c.user),
    __metadata("design:type", confirmationData_1.ConfirmationData)
], Users.prototype, "confirmationData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => securityDevices_entity_1.SecurityDevices, s => s.user, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Users.prototype, "securityDevices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => token_entity_1.Tokens, t => t.user),
    __metadata("design:type", Array)
], Users.prototype, "tokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => blog_entity_1.Blog, b => b.user),
    __metadata("design:type", Array)
], Users.prototype, "blogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comments, c => c.user),
    __metadata("design:type", Array)
], Users.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => postLike_entity_1.PostLikes, pl => pl.user),
    __metadata("design:type", Array)
], Users.prototype, "postLikes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => player_entity_1.Player, p => p.user),
    __metadata("design:type", Array)
], Users.prototype, "players", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
//# sourceMappingURL=user.entity.js.map