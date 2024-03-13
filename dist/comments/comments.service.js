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
const like_schema_1 = require("../postLikes/like.schema");
const comment_helper_1 = require("./comment.helper");
const commentsSql_repository_1 = require("./commentsSql.repository");
let CommentService = class CommentService {
    constructor(commentsRepository, postService, userService, commentSqlRepository) {
        this.commentsRepository = commentsRepository;
        this.postService = postService;
        this.userService = userService;
        this.commentSqlRepository = commentSqlRepository;
    }
    async createComment(postId, data, userId) {
        const post = await this.postService.findPostById(postId);
        if (!post) {
            return null;
        }
        const user = await this.userService.findById(userId);
        if (!user)
            return null;
        const newComment = await this.commentSqlRepository.createComment(post.id, data.content, user.id);
        return {
            id: newComment.id,
            content: newComment.content,
            createdAt: newComment.createdAt,
            commentatorInfo: {
                userId: user.id,
                userLogin: user.login
            },
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: like_schema_1.LikeStatus.None
            }
        };
    }
    async findById(id, userId) {
        const query = await this.commentSqlRepository.findById(id, userId);
        console.log("q", query);
        if (!query)
            return null;
        return comment_helper_1.commentHelper.commentsMapperFromSql(query);
    }
    async findCommentsByPostId(postId, params, userId) {
        const comments = await this.commentSqlRepository.findCommentsByPostId(postId, params, userId);
        return {
            ...comments,
            items: comments.items.map(el => comment_helper_1.commentHelper.commentsMapperFromSql(el))
        };
    }
    async deleteComment(id, userId) {
        return this.commentSqlRepository.deleteById(id, userId);
    }
    async updateComment(id, userId, content) {
        return this.commentSqlRepository.updateComment(id, userId, content);
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
        user_service_1.UserService,
        commentsSql_repository_1.CommentsSqlRepository])
], CommentService);
//# sourceMappingURL=comments.service.js.map