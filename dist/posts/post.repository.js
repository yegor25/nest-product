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
exports.PostRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const post_schema_1 = require("./post.schema");
const mongoose_2 = require("mongoose");
const postHelper_1 = require("./postHelper");
let PostRepository = class PostRepository {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async create(dto, blogName) {
        const data = { ...dto, blogName };
        const newPost = new this.postModel(data);
        await newPost.save();
        return newPost;
    }
    async createForBlog(dto, blogId, blogName) {
        const data = { ...dto, blogName, blogId };
        const newPost = new this.postModel(data);
        await newPost.save();
        return newPost;
    }
    async changePost(dto, id, blogName) {
        const post = await this.postModel.findByIdAndUpdate(id, { $set: { title: dto.title, shortDescription: dto.shortDescription, content: dto.content, blogId: dto.blogId, blogName: blogName } });
        if (!post)
            return false;
        return true;
    }
    async deletePost(id) {
        const deletedPost = await this.postModel.findByIdAndDelete(id);
        if (!deletedPost)
            return false;
        return true;
    }
    async findPostById(id) {
        const post = await this.postModel.findById(id);
        if (!post)
            return null;
        return post;
    }
    async findPosts(params, likePosts, userId) {
        const parametres = postHelper_1.postHelper.postParamsMapper(params);
        const skipcount = (parametres.pageNumber - 1) * parametres.pageSize;
        const user = userId ? userId : null;
        const res = await this.postModel.find({})
            .sort({ [parametres.sortBy]: parametres.sortDirection, "_id": parametres.sortDirection })
            .skip(skipcount)
            .limit(parametres.pageSize);
        const totalCount = await this.postModel.countDocuments({});
        const totalResult = res.map((el) => postHelper_1.postHelper.postViewMapper(el, likePosts, userId));
        const query = {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount,
            items: totalResult
        };
        return query;
    }
    async findPostsForBlog(params, blogId, likePosts, userId) {
        const parametres = postHelper_1.postHelper.postParamsMapper(params);
        const skipcount = (parametres.pageNumber - 1) * parametres.pageSize;
        const user = userId ? userId : null;
        const res = await this.postModel.find({ blogId })
            .sort({ [parametres.sortBy]: parametres.sortDirection, "_id": parametres.sortDirection })
            .skip(skipcount)
            .limit(parametres.pageSize)
            .lean();
        const totalCount = await this.postModel.countDocuments({ blogId });
        const reactions = likePosts.filter(el => res.find(item => item._id.toString() === el.postId));
        const totalResult = res.map((el) => postHelper_1.postHelper.postViewMapper(el, likePosts, userId));
        const query = {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount,
            items: totalResult
        };
        return query;
    }
    async deleteAll() {
        return this.postModel.deleteMany();
    }
};
exports.PostRepository = PostRepository;
exports.PostRepository = PostRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostRepository);
//# sourceMappingURL=post.repository.js.map