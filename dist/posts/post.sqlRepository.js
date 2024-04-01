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
exports.PostSqlRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const postHelper_1 = require("./postHelper");
const user_schema_1 = require("../users/user.schema");
const like_schema_1 = require("../postLikes/like.schema");
const post_entity_1 = require("./post.entity");
let PostSqlRepository = class PostSqlRepository {
    constructor(dataSource, postRepo) {
        this.dataSource = dataSource;
        this.postRepo = postRepo;
    }
    async createForBlog(dto, blogId, blogName) {
        const { title, shortDescription, content } = dto;
        const newPost = await this.postRepo
            .createQueryBuilder()
            .insert()
            .into(post_entity_1.Post)
            .values({
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            createdAt: new Date().toISOString(),
        })
            .returning("*")
            .execute();
        return newPost.raw[0];
    }
    async create(dto, blogName) {
        const { title, content, shortDescription, blogId } = dto;
        const newPost = await this.postRepo
            .createQueryBuilder()
            .insert()
            .into(post_entity_1.Post)
            .values({
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            createdAt: new Date().toISOString(),
        })
            .returning("*")
            .execute();
        return newPost.raw[0];
    }
    async findPostsForBlog(params, blogId, userId) {
        const parametres = postHelper_1.postHelper.postParamsMapper(params);
        const sortDirection = params.sortDirection
            ? params.sortDirection.toUpperCase()
            : user_schema_1.SortDirection.desc;
        const skipCount = (+parametres.pageNumber - 1) * Number(parametres.pageSize);
        const posts = await this.postRepo
            .createQueryBuilder("p")
            .select()
            .where(`p.blogId = :blogId`, { blogId })
            .orderBy(`p.${parametres.sortBy}`, `${sortDirection}`)
            .take(+parametres.pageSize)
            .skip(skipCount)
            .execute();
        const totalCount = await this.postRepo
            .createQueryBuilder("p")
            .select()
            .where("p.blogId = :blogId", { blogId })
            .getCount();
        return {
            items: posts.map((el) => ({
                ...el,
                extendedLikesInfo: {
                    likesCount: 0,
                    dislikesCount: 0,
                    myStatus: like_schema_1.LikeStatus.None,
                    newestLikes: [],
                },
            })),
            totalCount,
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
        };
    }
    async findById(postId, userId) {
        const myId = userId ? userId : "";
        const post = await this.postRepo
            .createQueryBuilder()
            .select()
            .where("id = :id", { id: postId })
            .getOne();
        if (post)
            return {
                ...post,
                likesCount: "0",
                dislikesCount: "0",
                myStatus: like_schema_1.LikeStatus.None,
                newestLikes: [],
            };
        return null;
    }
    async changeByBlogId(blogId, postId, dto) {
        const { shortDescription, title, content } = dto;
        const changing = await this.postRepo
            .createQueryBuilder()
            .update(post_entity_1.Post)
            .set({
            shortDescription,
            title,
            content,
        })
            .where("id = :id AND blogId = :blogId", { id: postId, blogId })
            .execute();
        if (changing.affected === 1)
            return true;
        return false;
    }
    async deleteByBlogId(postId, blogId) {
        const deleted = await this.postRepo
            .createQueryBuilder()
            .delete()
            .from(post_entity_1.Post)
            .where("id = :id AND blogId = :blogId", { id: postId, blogId })
            .execute();
        if (deleted.affected === 1)
            return true;
        return false;
    }
    async findPosts(params, userId) {
        const parametres = postHelper_1.postHelper.postParamsMapper(params);
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
        const sortDirection = params.sortDirection
            ? params.sortDirection.toUpperCase()
            : user_schema_1.SortDirection.desc;
        const posts = await this.postRepo
            .createQueryBuilder("p")
            .select()
            .orderBy(`b.${parametres.sortBy}`, `${sortDirection}`)
            .take(+parametres.pageSize)
            .skip(skipCount)
            .execute();
        const totalCount = await this.postRepo
            .createQueryBuilder()
            .select()
            .getCount();
        return {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: parametres.pageSize,
            totalCount: totalCount,
            items: posts.map((el) => ({
                ...el,
                likesCount: "0",
                dislikesCount: "0",
                myStatus: like_schema_1.LikeStatus.None,
                newestLikes: [],
            })),
        };
    }
    async findPostsForBlogId(params, blogId, userId) {
        const parametres = postHelper_1.postHelper.postParamsMapper(params);
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
        const sortDirection = params.sortDirection
            ? params.sortDirection.toUpperCase()
            : user_schema_1.SortDirection.desc;
        const posts = await this.postRepo
            .createQueryBuilder("p")
            .select()
            .where("p.blogId = :blogId", { blogId })
            .orderBy(`p.${parametres.sortBy}`, `${sortDirection}`)
            .take(+parametres.pageSize)
            .skip(skipCount)
            .execute();
        const totalCount = await this.postRepo
            .createQueryBuilder("p")
            .select()
            .where("p.blogId = :blogId", { blogId })
            .getCount();
        return {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: parametres.pageSize,
            totalCount: totalCount,
            items: posts.map((el) => ({
                ...el,
                likesCount: "0",
                dislikesCount: "0",
                myStatus: like_schema_1.LikeStatus.None,
                newestLikes: [],
            })),
        };
    }
};
exports.PostSqlRepository = PostSqlRepository;
exports.PostSqlRepository = PostSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], PostSqlRepository);
//# sourceMappingURL=post.sqlRepository.js.map