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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const post_repository_1 = require("./post.repository");
const postHelper_1 = require("./postHelper");
let PostService = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async create(dto) {
        const newPost = await this.postRepository.create(dto);
        const likes = newPost.getDefaultLikes();
        const resultDto = postHelper_1.postHelper.postViewMapper(newPost, likes);
        return resultDto;
    }
    async delete(id) {
        return this.postRepository.deletePost(id);
    }
    async findPostById(id) {
        const post = await this.postRepository.findPostById(id);
        if (!post)
            return null;
        const likes = post.getDefaultLikes();
        return postHelper_1.postHelper.postViewMapper(post, likes);
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [post_repository_1.PostRepository])
], PostService);
//# sourceMappingURL=post.service.js.map