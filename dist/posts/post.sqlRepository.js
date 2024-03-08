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
let PostSqlRepository = class PostSqlRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createForBlog(dto, blogId, blogName) {
        const { title, shortDescription, content } = dto;
        const newPost = await this.dataSource.query(`
            insert into public."Posts"
            ("title","shortDescription","content","blogId","blogName","createdAt")
            values($1,$2,$3,$4,$5,'${new Date().toISOString()}')
            returning * ;
        `, [title, shortDescription, content, blogId, blogName]);
        return newPost;
    }
    async create(dto, blogName) {
        const { title, content, shortDescription, blogId } = dto;
        const newPost = await this.dataSource.query(`
            insert into public."Posts"
            ("title","shortDescription","content","blogId","blogName","createdAt")
            values($1,$2,$3,$4,$5,'${new Date().toISOString()}')
            returning * ;
        `, [title, shortDescription, content, blogId, blogName]);
        return newPost;
    }
    async findPostsForBlog(params, blogId, userId) {
        const parametres = postHelper_1.postHelper.postParamsMapper(params);
        const sortDirection = params.sortDirection
            ? params.sortDirection
            : user_schema_1.SortDirection.desc;
        const skipCount = (+parametres.pageNumber - 1) * Number(parametres.pageSize);
        const query = `
        select * ,
        array(
        select row_to_json(row) from (
        select l."addedAt", l."userId", l."login"
        from public."PostLikes" l
        where p."id" = l."postId"
        )  as row ) as "newestLikes"
        from public."Posts" p
        where p."blogId" = $1;
        order by p."${parametres.sortBy}" ${sortDirection}
        limit ${+parametres.pageSize} offset ${skipCount}
        `;
        const totalCountQuery = `
       select count(*)
       from public."Posts" p
       where p."id" = $1 
    `;
        const totalCount = await this.dataSource.query(totalCountQuery, [blogId]);
        const posts = await this.dataSource.query(query, [
            blogId,
        ]);
        return {
            items: posts,
            totalCount,
            pagesCount: Math.ceil(+totalCount[0].count / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
        };
    }
};
exports.PostSqlRepository = PostSqlRepository;
exports.PostSqlRepository = PostSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], PostSqlRepository);
//# sourceMappingURL=post.sqlRepository.js.map