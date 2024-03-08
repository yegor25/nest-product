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
const blog_service_1 = require("../blogs/blog.service");
const postLike_service_1 = require("../postLikes/postLike.service");
const sa_blogs_service_1 = require("../sa-blogs/sa.blogs.service");
const post_sqlRepository_1 = require("./post.sqlRepository");
let PostService = class PostService {
    constructor(blogService, postLikeService, saBlogService, postSqlRepository, postRepository) {
        this.blogService = blogService;
        this.postLikeService = postLikeService;
        this.saBlogService = saBlogService;
        this.postSqlRepository = postSqlRepository;
        this.postRepository = postRepository;
    }
    async create(dto) {
        const blog = await this.blogService.findById(dto.blogId);
        if (!blog)
            return null;
        const newPost = await this.postSqlRepository.create(dto, blog?.name);
        const resultDto = postHelper_1.postHelper.postViewMapperDefault(newPost);
        return resultDto;
    }
    async createForBlog(dto, blogId) {
        const blog = await this.saBlogService.findById(blogId);
        if (!blog)
            return null;
        const newPost = await this.postSqlRepository.createForBlog(dto, blogId, blog.name);
        const resultDto = postHelper_1.postHelper.postViewMapperDefault(newPost);
        return resultDto;
        return null;
    }
    async changePost(dto, postId) {
        const blog = await this.blogService.findById(dto.blogId);
        if (!blog)
            return false;
        return this.postRepository.changePost(dto, postId, blog.name);
    }
    async delete(id) {
        return this.postRepository.deletePost(id);
    }
    async findPostById(id, userId) {
        const post = await this.postRepository.findPostById(id);
        if (!post)
            return null;
        const likes = await this.postLikeService.getByPostId(id);
        return postHelper_1.postHelper.postViewMapper(post, likes, userId);
    }
    async findPosts(params, userId) {
        const likes = await this.postLikeService.getAll();
        const post = await this.postRepository.findPosts(params, likes, userId);
        return post;
    }
    async findPostsForBlog(params, blogId, userId) {
        const blog = await this.blogService.findById(blogId);
        if (!blog)
            return null;
        const posts = await this.postSqlRepository.findPostsForBlog(params, blogId, userId);
        return posts;
    }
    async changeLikeStatus(userId, postId, likeStatus, login) {
        const existReaction = await this.postLikeService.checkReaction(userId, postId);
        if (existReaction)
            return this.postLikeService.changeExistReaction(userId, postId, likeStatus);
        return this.postLikeService.addNewReaction(userId, postId, likeStatus, login);
    }
    async deleteAll() {
        return this.postRepository.deleteAll();
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blog_service_1.BlogService,
        postLike_service_1.PostLikeService,
        sa_blogs_service_1.SuperAdminBlogService,
        post_sqlRepository_1.PostSqlRepository,
        post_repository_1.PostRepository])
], PostService);
//# sourceMappingURL=post.service.js.map