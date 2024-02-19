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
exports.SuperAdminBlogService = void 0;
const common_1 = require("@nestjs/common");
const sa_blogs_repository_1 = require("./sa.blogs.repository");
let SuperAdminBlogService = class SuperAdminBlogService {
    constructor(suBlogsRepository) {
        this.suBlogsRepository = suBlogsRepository;
    }
    async create(dto) {
        return this.suBlogsRepository.create(dto);
    }
    async findBlogs(params) {
        return this.suBlogsRepository.findBlogs(params);
    }
    async findById(id) {
        const blog = await this.suBlogsRepository.findById(id);
        if (!blog)
            return null;
        return blog;
    }
    async changeBlog(id, dto) {
        const blog = await this.suBlogsRepository.changeBlog(id, dto);
        if (!blog)
            return false;
        return true;
    }
    async deleteBlogById(id) {
        return this.suBlogsRepository.deleteBlogById(id);
    }
};
exports.SuperAdminBlogService = SuperAdminBlogService;
exports.SuperAdminBlogService = SuperAdminBlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sa_blogs_repository_1.SuperAdminBlogsRepository])
], SuperAdminBlogService);
//# sourceMappingURL=sa.blogs.service.js.map