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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSqlRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
let UserSqlRepository = class UserSqlRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async validate(loginOrEmail, pass) {
        const user = await this.dataSource.query(`
            select * from public."Users" u
            where u."login" = $1 or u."email" = $1
        `, [loginOrEmail]);
        if (!user[0])
            return null;
        const isMatchedPasswords = await bcrypt_1.default.compare(pass, user[0].passwordHash);
        if (!isMatchedPasswords)
            return null;
        return user[0];
    }
    async findById(id) {
        const user = await this.dataSource.query(`
            select * from public."Users" u
            where u."id" = $1;
        `, [id]);
        if (!user[0])
            return null;
        return user[0];
    }
    async registerUser(dto) {
        const user = await this.dataSource.query(`
            insert into public."Users"
            ("email","login","passwordSalt","passwordHash","isActiveAccount","createdAt")
            values('${dto.email}','${dto.login}','${dto.passwordSalt}','${dto.hashPassword}','false','${new Date().toISOString()}')
            returning "id","createdAt"
        ;
        `);
        return user[0].id;
    }
    async checkCodeConfirmation(code) {
        const user = await this.dataSource.query(`
                select c."userId",c."expirationDate",u."isActiveAccount"
                from public."ConfirmationData" as c
                Left JOIN public."Users" u
                ON c."userId" = u.id
                WHERE c."code" = $1;
        `, [code]);
        return user[0];
    }
    async activateAccount(userId) {
        const activeUser = await this.dataSource.query(`
        update public."Users" as u
        set "isActiveAccount" = 'true'
        where u."id" = $1
        returning *;
        `, [userId]);
        return activeUser[0];
    }
    async validateResendingUser(email) {
        const user = await this.dataSource.query(`
        select u."isActiveAccount" from public."Users"
        where u."email" = $1;
        `, [email]);
        if (user[0] && !user[0].isActiveAccount)
            return true;
        return false;
    }
};
exports.UserSqlRepository = UserSqlRepository;
exports.UserSqlRepository = UserSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], UserSqlRepository);
//# sourceMappingURL=userSql.repository.js.map