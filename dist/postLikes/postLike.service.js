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
exports.PostLikeService = void 0;
const common_1 = require("@nestjs/common");
const postLike_repository_1 = require("./postLike.repository");
let PostLikeService = class PostLikeService {
    constructor(postLikeRepository) {
        this.postLikeRepository = postLikeRepository;
    }
    async checkReaction(userId, postId) {
        return this.postLikeRepository.checkReaction(userId, postId);
    }
    async changeExistReaction(userId, postId, likeStatus) {
        return this.postLikeRepository.changeExistReaction(userId, postId, likeStatus);
    }
    async addNewReaction(userId, postId, likeStatus, login) {
        return this.postLikeRepository.addNewReaction(userId, postId, likeStatus, login);
    }
    async getByPostId(postId) {
        return this.postLikeRepository.getByPostId(postId);
    }
    async getAll() {
        return this.postLikeRepository.getAll();
    }
};
exports.PostLikeService = PostLikeService;
exports.PostLikeService = PostLikeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postLike_repository_1.PostLikeRepository])
], PostLikeService);
//# sourceMappingURL=postLike.service.js.map