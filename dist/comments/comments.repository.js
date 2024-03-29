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
exports.CommentsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("./comment.schema");
const mongoose_2 = require("mongoose");
const comment_helper_1 = require("./comment.helper");
let CommentsRepository = class CommentsRepository {
    constructor(commentsModel) {
        this.commentsModel = commentsModel;
    }
    async createComment(comment) {
        const res = await this.commentsModel.create(comment);
        return comment_helper_1.commentHelper.commentsMapper(res, comment.commentatorInfo.userId);
    }
    async deleteComments(id, userId) {
        const comment = await this.commentsModel.findById(id);
        if (comment?.commentatorInfo.userId !== userId) {
            return false;
        }
        const res = await this.commentsModel.findByIdAndDelete(id);
        if (!res)
            return false;
        return true;
    }
    async updateComment(id, userId, content) {
        const comment = await this.commentsModel.findById(id);
        if (comment?.commentatorInfo.userId !== userId) {
            return false;
        }
        const res = await this.commentsModel.findByIdAndUpdate(id, { $set: { content: content } });
        if (!res)
            return false;
        return true;
    }
    async findById(id) {
        return this.commentsModel.findById(id);
    }
    async findCommentsByPostId(postId, params, userId) {
        const parametres = comment_helper_1.commentHelper.commentsParamsMapper(params);
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
        const comments = await this.commentsModel.find({ postId: postId })
            .sort({ [parametres.sortBy]: parametres.sortDirection, "_id": parametres.sortDirection })
            .skip(skipCount)
            .limit(parametres.pageSize);
        const totalCount = await this.commentsModel.countDocuments({ postId });
        return {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount,
            items: comments.map(el => comment_helper_1.commentHelper.commentsMapper(el, userId))
        };
    }
    async deleteAll() {
        const res = await this.commentsModel.deleteMany({});
        return res.deletedCount > 0;
    }
    async changeExistLikeStatus(status, commentId, userId) {
        const post = await this.commentsModel.findById(commentId);
        if (!post)
            return false;
        const newItem = { userId, status };
        const existReaction = post.likeComments.find(el => el.userId === userId);
        if (!existReaction) {
            post.likeComments.push(newItem);
            await post.save();
            return true;
        }
        else {
            post.likeComments = post.likeComments.map(el => el.userId === userId ? { ...el, status: status } : el);
            await post.save();
            return;
        }
    }
};
exports.CommentsRepository = CommentsRepository;
exports.CommentsRepository = CommentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comments.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CommentsRepository);
//# sourceMappingURL=comments.repository.js.map