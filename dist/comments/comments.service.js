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
exports.CommentService = void 0;
const user_service_1 = require("../users/user.service");
const post_service_1 = require("../posts/post.service");
const comments_repository_1 = require("./comments.repository");
const common_1 = require("@nestjs/common");
const comment_helper_1 = require("./comment.helper");
let CommentService = class CommentService {
    constructor(commentsRepository, postService, userService) {
        this.commentsRepository = commentsRepository;
        this.postService = postService;
        this.userService = userService;
    }
    async createComment(postId, data, userId) {
        const post = await this.postService.findPostById(postId);
        if (!post) {
            return null;
        }
        const user = await this.userService.findById(userId);
        if (!user)
            return null;
        const newComment = {
            content: data.content,
            postId,
            commentatorInfo: {
                userId: userId,
                userLogin: user.login
            }
        };
        return this.commentsRepository.createComment(newComment);
    }
    async findById(id, userId) {
        const query = await this.commentsRepository.findById(id);
        if (!query)
            return null;
        return comment_helper_1.commentHelper.commentsMapper(query, userId);
    }
    async findCommentsByPostId(postId, userId) {
        const query = await this.commentsRepository.findCommentsByPostId(postId);
        const result = query.map(el => comment_helper_1.commentHelper.commentsMapper(el, userId));
        return result;
    }
    async deleteComment(id, userId) {
        return this.commentsRepository.deleteComments(id, userId);
    }
    async updateComment(id, userId, content) {
        return this.commentsRepository.updateComment(id, userId, content);
    }
    async updateLikeStatus(likeStatus, userId, commentId) {
        const newStatus = await this.commentsRepository.changeExistLikeStatus(likeStatus, commentId, userId);
        if (!newStatus)
            return false;
        return true;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRepository,
        post_service_1.PostService,
        user_service_1.UserService])
], CommentService);
//# sourceMappingURL=comments.service.js.map