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
exports.Comments = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const post_entity_1 = require("../posts/post.entity");
const typeorm_1 = require("typeorm");
const commentLike_entity_1 = require("../commentsLikes/commentLike.entity");
let Comments = class Comments {
};
exports.Comments = Comments;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Comments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comments.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comments.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comments.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comments.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commentLike_entity_1.CommentLikes, (cl) => cl.comment),
    __metadata("design:type", Array)
], Comments.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (p) => p.comments),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", post_entity_1.Post)
], Comments.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (u) => u.comments),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.Users)
], Comments.prototype, "user", void 0);
exports.Comments = Comments = __decorate([
    (0, typeorm_1.Entity)()
], Comments);
//# sourceMappingURL=comment.entity.js.map