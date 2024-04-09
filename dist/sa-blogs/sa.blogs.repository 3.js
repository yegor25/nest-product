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
exports.SuperAdminBlogsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blog_schema_1 = require("../blogs/blog.schema");
const typeorm_2 = require("typeorm");
const blog_helper_1 = require("../blogs/blog.helper");
let SuperAdminBlogsRepository = class SuperAdminBlogsRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async create(dto) {
        const { name, description, websiteUrl } = dto;
        const newBlog = await this.dataSource.query(`
            insert into public."Blogs"
            ("name", "description","websiteUrl", "createdAt","isMembership")
            values($1,$2,$3,'${new Date().toISOString()}','false')
            returning *;
        `, [name, description, websiteUrl]);
        return newBlog[0];
    }
    async findById(id) {
        const blog = await this.dataSource.query(`
            select b."id", b."name", b."description", b."websiteUrl", b."createdAt", b."isMembership" from public."Blogs" b
            where b."id" = $1;
        `, [id]);
        if (!blog[0])
            return null;
        return blog[0];
    }
    async findBlogs(params) {
        const parametres = blog_helper_1.blogHelper.blogParamsMapper(params);
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
        const term = params.searchNameTerm ? params.searchNameTerm : "";
        console.log("term", term);
        const sortDirection = params.sortDirection
            ? params.sortDirection
            : blog_schema_1.SortDirection.desc;
        const blogQuery = `
            select b."id", b."name", b."description", b."websiteUrl", b."createdAt", b."isMembership" from public."Blogs" b
            where b."name"  ilike '%${term}%'
            order by b."${parametres.sortBy}" ${sortDirection}
            limit ${+parametres.pageSize} offset ${skipCount}
            ;
        `;
        const totalCountQuery = `
            select count(*)
            from public."Blogs" b
            where b."name"  ilike '%${term}%';
        `;
        const blogs = await this.dataSource.query(blogQuery);
        const totalCount = await this.dataSource.query(totalCountQuery);
        const res = {
            pagesCount: Math.ceil(+totalCount[0].count / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount: +totalCount[0].count,
            items: blogs,
        };
        return res;
    }
    async changeBlog(id, dto) {
        const { name, websiteUrl, description } = dto;
        const changing = await this.dataSource.query(`
        update public."Blogs" u
        set "name" = $2, "websiteUrl" = $3, "description" = $4
        where u."id" = $1
        returning *
        ;
        `, [id, name, websiteUrl, description]);
        if (changing[0].length)
            return true;
        return false;
    }
    async deleteBlogById(blogId) {
        const deleted = await this.dataSource.query(`
            Delete from public."Blogs" b
            where b."id" = $1
        `, [blogId]);
        if (deleted[1] === 1)
            return true;
        return false;
    }
    async deleteAll() {
        return this.dataSource.query(`
    Truncate public."Blogs" Cascade;
        `);
    }
};
exports.SuperAdminBlogsRepository = SuperAdminBlogsRepository;
exports.SuperAdminBlogsRepository = SuperAdminBlogsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], SuperAdminBlogsRepository);
//# sourceMappingURL=sa.blogs.repository.js.map