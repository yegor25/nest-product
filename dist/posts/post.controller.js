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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const comment_schema_1 = require("../comments/comment.schema");
const comments_service_1 = require("../comments/comments.service");
const user_service_1 = require("../users/user.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth-guard");
const like_schema_1 = require("../postLikes/like.schema");
const basic_auth_guard_1 = require("../auth/guards/basic-auth.guard");
let PostController = class PostController {
    constructor(postService, commentService, userService) {
        this.postService = postService;
        this.commentService = commentService;
        this.userService = userService;
    }
    async createPost(body) {
        return this.postService.create(body);
    }
    async findPosts(params) {
        return this.postService.findPosts(params, params.userId);
    }
    async findPostById(postId, data) {
        const post = await this.postService.findPostById(postId, data.userId);
        if (!post)
            throw new common_1.NotFoundException();
        return post;
    }
    async changePost(postId, body) {
        const post = await this.postService.changePost(body, postId);
        if (!post)
            throw new common_1.NotFoundException();
        return;
    }
    async deletePost(postId) {
        const deletedPost = await this.postService.delete(postId);
        if (!deletedPost)
            throw new common_1.NotFoundException();
        return;
    }
    async createComment(body, postId, req) {
        const comment = await this.commentService.createComment(postId, body, req.user.userId);
        if (!comment)
            throw new common_1.NotFoundException();
        return comment;
    }
    async findComments(postId) {
        const post = await this.postService.findPostById(postId);
        if (!post)
            throw new common_1.NotFoundException();
        return this.commentService.findCommentsByPostId(postId);
    }
    async changeLikeStatus(postId, body, req) {
        const post = await this.postService.findPostById(postId);
        if (!post)
            throw new common_1.NotFoundException();
        if (!Object.values(like_schema_1.LikeStatus).includes(body.likeStatus))
            throw new common_1.BadRequestException([{ message: "invalid like-status", field: "likeStatus" }]);
        return this.postService.changeLikeStatus(req.user.userId, postId, body.likeStatus, req.user.login);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findPosts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findPostById", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "changePost", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':postId/comments'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('postId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_schema_1.CreatedCommentDto, String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)(':postId/comments'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findComments", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(204),
    (0, common_1.Put)(':postId/like-status'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "changeLikeStatus", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService,
        comments_service_1.CommentService,
        user_service_1.UserService])
], PostController);
//# sourceMappingURL=post.controller.js.map