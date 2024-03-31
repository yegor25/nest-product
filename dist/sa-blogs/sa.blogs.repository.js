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
const blog_entity_1 = require("../blogs/blog.entity");
let SuperAdminBlogsRepository = class SuperAdminBlogsRepository {
    constructor(dataSource, blogRepo) {
        this.dataSource = dataSource;
        this.blogRepo = blogRepo;
    }
    async create(dto) {
        const { name, description, websiteUrl } = dto;
        const newBlog = await this.blogRepo
            .createQueryBuilder()
            .insert()
            .into(blog_entity_1.Blog)
            .values({
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        })
            .returning(["*"])
            .execute();
        return newBlog.raw[0];
    }
    async findById(id) {
        const blog = await this.blogRepo
            .createQueryBuilder()
            .select()
            .where("id = :id", { id })
            .getOne();
        if (!blog)
            return null;
        return blog;
    }
    async findBlogs(params) {
        const parametres = blog_helper_1.blogHelper.blogParamsMapper(params);
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
        const term = params.searchNameTerm ? params.searchNameTerm : "";
        const sortDirection = params.sortDirection
            ? params.sortDirection.toUpperCase()
            : blog_schema_1.SortDirection.desc;
        const blogs = await this.blogRepo
            .createQueryBuilder("b")
            .select(`b."id",name,b."websiteUrl",description,b."createdAt",b."isMembership"`)
            .where("b.name ilike :term", { term: `%${term}%` })
            .orderBy(`b.${parametres.sortBy}`, `${sortDirection}`)
            .take(+parametres.pageSize)
            .skip(skipCount)
            .execute();
        const totalCount = await this.blogRepo
            .createQueryBuilder("b")
            .where("b.name ilike :term", { term: `%${term}%` })
            .getCount();
        const res = {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount: totalCount,
            items: blogs,
        };
        return res;
    }
    async changeBlog(id, dto) {
        const { name, websiteUrl, description } = dto;
        const changing = await this.blogRepo
            .createQueryBuilder()
            .update(blog_entity_1.Blog)
            .set({ name, websiteUrl, description })
            .where("id = :id", { id })
            .execute();
        if (changing.affected === 1)
            return true;
        return false;
    }
    async deleteBlogById(blogId) {
        const deleted = await this.blogRepo
            .createQueryBuilder()
            .delete()
            .from(blog_entity_1.Blog)
            .where("id = :id", { id: blogId })
            .execute();
        if (deleted.affected === 1)
            return true;
        return false;
    }
    async deleteAll() {
        return this.blogRepo.createQueryBuilder().delete().from(blog_entity_1.Blog).execute();
    }
};
exports.SuperAdminBlogsRepository = SuperAdminBlogsRepository;
exports.SuperAdminBlogsRepository = SuperAdminBlogsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], SuperAdminBlogsRepository);
//# sourceMappingURL=sa.blogs.repository.js.map