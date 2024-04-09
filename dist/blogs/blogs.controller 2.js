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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_schema_1 = require("./blog.schema");
const blog_service_1 = require("./blog.service");
const post_schema_1 = require("../posts/post.schema");
const post_service_1 = require("../posts/post.service");
const basic_auth_guard_1 = require("../auth/guards/basic-auth.guard");
let BlogController = class BlogController {
    constructor(blogService, postService) {
        this.blogService = blogService;
        this.postService = postService;
    }
    async createBlog(body) {
        return this.blogService.create(body);
    }
    async createPost(blogId, body) {
        const post = await this.postService.createForBlog(body, blogId);
        if (!post)
            throw new common_1.NotFoundException();
        return post;
    }
    async findBlogs(params) {
        return this.blogService.findBlogs(params);
    }
    async findBlogById(blogId) {
        const blog = await this.blogService.findById(blogId);
        if (!blog)
            throw new common_1.NotFoundException();
        return blog;
    }
    async findPostsForBlog(blogId, params) {
        const posts = await this.postService.findPostsForBlog(params, blogId, params.userId);
        if (!posts)
            throw new common_1.NotFoundException();
        return posts;
    }
    async changeBlog(blogId, body) {
        const blog = await this.blogService.changeBlog(blogId, body);
        if (!blog)
            throw new common_1.NotFoundException();
        return;
    }
    async deleteBlog(blogId) {
        const deletedBlog = await this.blogService.deleteBlogById(blogId);
        if (!deletedBlog)
            throw new common_1.NotFoundException();
        return;
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_schema_1.createdDtoBlogType]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "createBlog", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Post)(':blogId/posts'),
    __param(0, (0, common_1.Param)('blogId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, post_schema_1.createdPosForBlogtDtoType]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findBlogs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findBlogById", null);
__decorate([
    (0, common_1.Get)(':blogId/posts'),
    __param(0, (0, common_1.Param)('blogId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findPostsForBlog", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, blog_schema_1.createdDtoBlogType]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "changeBlog", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteBlog", null);
exports.BlogController = BlogController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blog_service_1.BlogService,
        post_service_1.PostService])
], BlogController);
//# sourceMappingURL=blogs.controller.js.map