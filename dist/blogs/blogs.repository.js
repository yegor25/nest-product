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
exports.BlogRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("./blog.schema");
const blog_helper_1 = require("./blog.helper");
let BlogRepository = class BlogRepository {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async create(dto) {
        const newBlog = new this.blogModel(dto);
        await newBlog.save();
        return newBlog;
    }
    async findById(id) {
        const blog = await this.blogModel.findById(id);
        return blog;
    }
    async findBlogs(params) {
        const parametres = blog_helper_1.blogHelper.blogParamsMapper(params);
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
        const blogs = await this.blogModel.find({
            name: { $regex: parametres.searchNameTerm, $options: "i" }
        })
            .sort({ [parametres.sortBy]: parametres.sortDirection, "_id": parametres.sortDirection })
            .skip(skipCount)
            .limit(parametres.pageSize)
            .lean();
        const totalCount = await this.blogModel.countDocuments({ name: { $regex: parametres.searchNameTerm, $options: "i" } });
        return {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount,
            items: blogs.map(b => blog_helper_1.blogHelper.getViewBlog(b))
        };
    }
    async changeBlog(id, dto) {
        const blog = await this.blogModel.findByIdAndUpdate(id, { $set: { name: dto.name, websiteUrl: dto.websiteUrl, description: dto.description } });
        return blog;
    }
    async deleteAll() {
        return this.blogModel.deleteMany({});
    }
};
exports.BlogRepository = BlogRepository;
exports.BlogRepository = BlogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogRepository);
//# sourceMappingURL=blogs.repository.js.map