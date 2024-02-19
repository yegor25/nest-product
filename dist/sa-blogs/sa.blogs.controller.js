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
exports.SuperAdminBlogsController = void 0;
const common_1 = require("@nestjs/common");
const basic_auth_guard_1 = require("../auth/guards/basic-auth.guard");
const blog_schema_1 = require("../blogs/blog.schema");
const sa_blogs_service_1 = require("./sa.blogs.service");
let SuperAdminBlogsController = class SuperAdminBlogsController {
    constructor(suBlogsService) {
        this.suBlogsService = suBlogsService;
    }
    async createBlog(body) {
        return this.suBlogsService.create(body);
    }
    async findBlogs(params) {
        return this.suBlogsService.findBlogs(params);
    }
    async findBlogById(blogId) {
        const blog = await this.suBlogsService.findById(blogId);
        if (!blog)
            throw new common_1.NotFoundException();
        return blog;
    }
    async changeBlog(blogId, body) {
        const blog = await this.suBlogsService.changeBlog(blogId, body);
        if (!blog)
            throw new common_1.NotFoundException();
        return;
    }
    async deleteBlog(blogId) {
        const deletedBlog = await this.suBlogsService.deleteBlogById(blogId);
        if (!deletedBlog)
            throw new common_1.NotFoundException();
        return;
    }
};
exports.SuperAdminBlogsController = SuperAdminBlogsController;
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_schema_1.createdDtoBlogType]),
    __metadata("design:returntype", Promise)
], SuperAdminBlogsController.prototype, "createBlog", null);
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperAdminBlogsController.prototype, "findBlogs", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuperAdminBlogsController.prototype, "findBlogById", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Put)(":id"),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, blog_schema_1.createdDtoBlogType]),
    __metadata("design:returntype", Promise)
], SuperAdminBlogsController.prototype, "changeBlog", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuperAdminBlogsController.prototype, "deleteBlog", null);
exports.SuperAdminBlogsController = SuperAdminBlogsController = __decorate([
    (0, common_1.Controller)("sa/blogs"),
    __metadata("design:paramtypes", [sa_blogs_service_1.SuperAdminBlogService])
], SuperAdminBlogsController);
//# sourceMappingURL=sa.blogs.controller.js.map