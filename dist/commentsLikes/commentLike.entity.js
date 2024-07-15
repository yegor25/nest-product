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
exports.CommentLikes = void 0;
const comment_entity_1 = require("../comments/comment.entity");
const like_schema_1 = require("../postLikes/like.schema");
const typeorm_1 = require("typeorm");
let CommentLikes = class CommentLikes {
};
exports.CommentLikes = CommentLikes;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid" }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], CommentLikes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommentLikes.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommentLikes.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommentLikes.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], CommentLikes.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comment_entity_1.Comments, c => c.likes, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "commentId" }),
    __metadata("design:type", comment_entity_1.Comments)
], CommentLikes.prototype, "comment", void 0);
exports.CommentLikes = CommentLikes = __decorate([
    (0, typeorm_1.Entity)()
], CommentLikes);
//# sourceMappingURL=commentLike.entity.js.map