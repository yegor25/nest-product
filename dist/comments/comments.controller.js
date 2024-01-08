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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth-guard");
const comment_schema_1 = require("./comment.schema");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async getById(commentId) {
        const data = await this.commentService.findById(commentId);
        if (!data)
            throw new common_1.NotFoundException();
        return data;
    }
    async deleteComment(commentId, req) {
        const data = await this.commentService.findById(commentId);
        if (!data)
            throw new common_1.NotFoundException();
        const userId = req.user.userId;
        const result = await this.commentService.deleteComment(commentId, userId);
        if (!result)
            throw new common_1.ForbiddenException();
        return;
    }
    async changeComment(body, commentId, req) {
        const content = body.content;
        const userId = req.user.userId;
        const data = await this.commentService.findById(commentId);
        if (!data)
            throw new common_1.NotFoundException();
        const result = await this.commentService.updateComment(commentId, userId, content);
        if (!result)
            throw new common_1.ForbiddenException();
        return;
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':commentId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('commentId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':commentId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_schema_1.CreatedCommentDto, String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "changeComment", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comments.controller.js.map