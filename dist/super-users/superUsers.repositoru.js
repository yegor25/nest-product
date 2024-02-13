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
let SuperUserRepository = class SuperUserRepository {
    constructor(dataSourse) {
        this.dataSourse = dataSourse;
    }
    async create(dto) {
        const user = await this.dataSourse.query(`
            insert into public."Users"
            ("email","login","passwordSalt","passwordHash","isActiveAccount","createdAt")
            values('${dto.email}','${dto.login}','${dto.passwordSalt}','${dto.hashPassword}','true','${new Date().toISOString()}')
            returning "id","createdAt"
        ;
        `);
        return { id: user[0].id, createdAt: user[0].createdAt };
    }
    async checkByEmail(email) {
        const user = await this.dataSourse.query(`
            SELECT * from public."Users" u
            WHERE u."email" = '${email}';
        `);
        if (user[0])
            return true;
        return false;
    }
    async checkByLogin(login) {
        const user = await this.dataSourse.query(`
            SELECT * from public."Users" u
            WHERE u."login" = $1;
        `, [login]);
        if (user[0])
            return true;
        return false;
    }
    async deleteAll() {
        return this.dataSourse.query(`
        Truncate public."Users" Cascade;
        `);
    }
    async findById(id) {
        const user = await this.dataSourse.query(`
            Select * from public."Users" u
            WHERE u."id" = $1;
        `, [id]);
        return user[0];
    }
    async deleteUser(id) {
        const user = await this.dataSourse.query(`
            Delete from public."Users" u
            WHERE u."id" = $1;
        `, [id]);
        if (user[1] === 1)
            return true;
        return false;
    }
    async finddAll(params) {
        const parametres = user_helper_1.userHelper.usersParamsMapper(params);
        const skipCount = (+parametres.pageNumber - 1) * Number(parametres.pageSize);
        const loginTerm = params.searchLoginTerm ? params.searchLoginTerm : '';
        const emailTerm = params.searchEmailTerm ? params.searchEmailTerm : '';
        const sortDirection = params.sortDirection ? params.sortDirection : user_schema_1.SortDirection.desc;
        const queryTotalCountString = `
            select count(*)
            from public."Users" u
            where u."login" ilike '%${loginTerm}%' OR u."email" ilike '%${emailTerm}%';
        `;
        const queryUserString = `
            select u."email",u."login",u."id",u."createdAt"
            from public."Users" u
            where u."login" ilike '%${loginTerm}%' OR u."email" ilike '%${emailTerm}%'
            order by u."${parametres.sortBy}" ${sortDirection}
            limit ${+parametres.pageSize} offset ${skipCount}
            ;
        `;
        const totalCount = await this.dataSourse.query(queryTotalCountString);
        const users = await this.dataSourse.query(queryUserString);
        const result = {
            pagesCount: Math.ceil(+totalCount[0].count / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount: +totalCount[0].count,
            items: users
        };
        return result;
    }
};
exports.SuperUserRepository = SuperUserRepository;
exports.SuperUserRepository = SuperUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], SuperUserRepository);
//# sourceMappingURL=superUsers.repositoru.js.map