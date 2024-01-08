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
exports.CommentsSchema = exports.CreatedCommentDto = exports.Comments = exports.CommentsLike = exports.CommentatorInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const like_schema_1 = require("../postLikes/like.schema");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let CommentatorInfo = class CommentatorInfo {
};
exports.CommentatorInfo = CommentatorInfo;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CommentatorInfo.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CommentatorInfo.prototype, "userLogin", void 0);
exports.CommentatorInfo = CommentatorInfo = __decorate([
    (0, mongoose_1.Schema)()
], CommentatorInfo);
let CommentsLike = class CommentsLike {
};
exports.CommentsLike = CommentsLike;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CommentsLike.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: like_schema_1.LikeStatus,
        default: like_schema_1.LikeStatus.None
    }),
    __metadata("design:type", String)
], CommentsLike.prototype, "status", void 0);
exports.CommentsLike = CommentsLike = __decorate([
    (0, mongoose_1.Schema)()
], CommentsLike);
let Comments = class Comments {
};
exports.Comments = Comments;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Comments.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", CommentatorInfo)
], Comments.prototype, "commentatorInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: new Date().toISOString()
    }),
    __metadata("design:type", String)
], Comments.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Comments.prototype, "postId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: []
    }),
    __metadata("design:type", Array)
], Comments.prototype, "likeComments", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0
    }),
    __metadata("design:type", Number)
], Comments.prototype, "likesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0
    }),
    __metadata("design:type", Number)
], Comments.prototype, "dislikesCount", void 0);
exports.Comments = Comments = __decorate([
    (0, mongoose_1.Schema)()
], Comments);
class CreatedCommentDto {
}
exports.CreatedCommentDto = CreatedCommentDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value.trim())),
    (0, class_validator_1.MinLength)(20),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], CreatedCommentDto.prototype, "content", void 0);
exports.CommentsSchema = mongoose_1.SchemaFactory.createForClass(Comments);
//# sourceMappingURL=comment.schema.js.map