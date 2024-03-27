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
exports.SuperUserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_schema_1 = require("../users/user.schema");
const typeorm_2 = require("typeorm");
const user_helper_1 = require("../users/user.helper");
const user_entity_1 = require("../users/entities/user.entity");
let SuperUserRepository = class SuperUserRepository {
    constructor(dataSourse, userRepo) {
        this.dataSourse = dataSourse;
        this.userRepo = userRepo;
    }
    async create(dto) {
        const user = await this.userRepo
            .createQueryBuilder()
            .insert()
            .into(user_entity_1.Users)
            .values({
            email: dto.email,
            login: dto.login,
            passwordHash: dto.hashPassword,
            passwordSalt: dto.passwordSalt,
            isActiveAccount: true,
            createdAt: new Date().toISOString(),
        })
            .returning(["id", "createdAt"])
            .execute();
        const res = user.raw[0];
        return { id: res.id, createdAt: res.createdAt };
    }
    async checkByEmail(email) {
        const user = await this.userRepo
            .createQueryBuilder()
            .select()
            .where("email = :email", { email })
            .getOne();
        if (user)
            return true;
        return false;
    }
    async checkByLogin(login) {
        const user = await this.userRepo
            .createQueryBuilder()
            .select()
            .where("login = :login", { login })
            .getOne();
        if (user)
            return true;
        return false;
    }
    async deleteAll() {
        await this.userRepo.createQueryBuilder().delete().from(user_entity_1.Users).execute();
        return;
    }
    async findById(id) {
        const user = await this.userRepo
            .createQueryBuilder()
            .select()
            .where("id = :id", { id })
            .getOne();
        return user;
    }
    async deleteUser(id) {
        const user = await this.userRepo
            .createQueryBuilder()
            .delete()
            .from(user_entity_1.Users)
            .where("id = :id", { id })
            .execute();
        if (user.affected === 1)
            return true;
        return false;
    }
    async finddAll(params) {
        const parametres = user_helper_1.userHelper.usersParamsMapper(params);
        const skipCount = (+parametres.pageNumber - 1) * Number(parametres.pageSize);
        const loginTerm = params.searchLoginTerm ? params.searchLoginTerm : "";
        const emailTerm = params.searchEmailTerm ? params.searchEmailTerm : "";
        const sortDirection = params.sortDirection
            ? params.sortDirection
            : user_schema_1.SortDirection.desc;
        const queryTotalCountString = `
            select count(*)
            from public."Users" u
            where u."login" ilike '%${loginTerm}%' OR u."email" ilike '%${emailTerm}%';
        `;
        const queryUserString = `
            select u."email",u."login",u."id",u."createdAt"
            from public."Users" u
            where  u."login"  ilike  '%${loginTerm}%' OR u."email" ilike '%${emailTerm}%'
            order by u."${parametres.sortBy}" ${sortDirection}
            limit ${+parametres.pageSize} offset ${skipCount}
            ;
        `;
        const totalCount = await this.userRepo
            .createQueryBuilder()
            .where("login ilike :loginTerm OR email ilike :emailTerm", {
            loginTerm: `%${loginTerm}%`,
            emailTerm: `%${emailTerm}%`,
        })
            .getCount();
        console.log("total", totalCount);
        const users = await this.userRepo
            .createQueryBuilder("u")
            .select(`"id","login","email",u."createdAt"`)
            .where("login ilike :loginTerm OR email ilike :emailTerm", {
            loginTerm: `%${loginTerm}%`,
            emailTerm: `%${emailTerm}%`,
        })
            .orderBy(`u.${parametres.sortBy}`, `${sortDirection}`)
            .take(+parametres.pageSize)
            .skip(skipCount)
            .execute();
        const result = {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount: totalCount,
            items: users,
        };
        return result;
    }
};
exports.SuperUserRepository = SuperUserRepository;
exports.SuperUserRepository = SuperUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], SuperUserRepository);
//# sourceMappingURL=superUsers.repositoru.js.map