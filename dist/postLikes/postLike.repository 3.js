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
exports.PostLikeRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const like_schema_1 = require("./like.schema");
const mongoose_2 = require("mongoose");
let PostLikeRepository = class PostLikeRepository {
    constructor(likesPost) {
        this.likesPost = likesPost;
    }
    async getByPostId(postId) {
        const likes = await this.likesPost.find({ postId });
        return likes;
    }
    async getAll() {
        return this.likesPost.find();
    }
    async checkReaction(userId, postId) {
        const reaction = await this.likesPost.findOne({ userId: userId, postId: postId });
        if (!reaction)
            return false;
        return true;
    }
    async changeExistReaction(userId, postId, likeStatus) {
        const newReaction = await this.likesPost.findOneAndUpdate({ userId: userId, postId: postId }, { $set: { status: likeStatus, isFirst: false, addedAt: new Date() } });
        if (!newReaction)
            return false;
        return true;
    }
    async addNewReaction(userId, postId, likeStatus, login) {
        const newReaction = new this.likesPost({
            status: likeStatus,
            userId,
            login,
            postId,
            isFirst: true
        });
        await newReaction.save();
        return;
    }
};
exports.PostLikeRepository = PostLikeRepository;
exports.PostLikeRepository = PostLikeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(like_schema_1.LikesPost.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostLikeRepository);
//# sourceMappingURL=postLike.repository.js.map