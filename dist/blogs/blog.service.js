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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const blogs_repository_1 = require("./blogs.repository");
const blog_helper_1 = require("./blog.helper");
const sa_blogs_repository_1 = require("../sa-blogs/sa.blogs.repository");
let BlogService = class BlogService {
    constructor(blogRepository, blogsSqlRepository) {
        this.blogRepository = blogRepository;
        this.blogsSqlRepository = blogsSqlRepository;
    }
    async create(dto) {
        const blog = await this.blogRepository.create(dto);
        return blog_helper_1.blogHelper.getViewBlog(blog);
    }
    async findBlogs(params) {
        const blogs = await this.blogRepository.findBlogs(params);
        return blogs;
    }
    async findById(id) {
        const blog = await this.blogsSqlRepository.findById(id);
        if (!blog)
            return null;
        return blog;
    }
    async changeBlog(id, dto) {
        const blog = await this.blogRepository.changeBlog(id, dto);
        if (!blog)
            return false;
        return true;
    }
    async deleteBlogById(id) {
        return this.blogRepository.deleteById(id);
    }
    async deleteAll() {
        return this.blogRepository.deleteAll();
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blogs_repository_1.BlogRepository,
        sa_blogs_repository_1.SuperAdminBlogsRepository])
], BlogService);
//# sourceMappingURL=blog.service.js.map