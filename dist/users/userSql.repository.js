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
const user_entity_1 = require("./entities/user.entity");
let UserSqlRepository = class UserSqlRepository {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async validate(loginOrEmail, pass) {
        const user = await this.usersRepository
            .createQueryBuilder("u")
            .where("u.login = :loginOrEmail or u.email = :loginOrEmail", { loginOrEmail })
            .getOne();
        if (!user)
            return null;
        const isMatchedPasswords = await bcrypt_1.default.compare(pass, user.passwordHash);
        if (!isMatchedPasswords)
            return null;
        return user;
    }
    async findById(id) {
        const user = await this.usersRepository
            .createQueryBuilder("u")
            .where("u.id = :id", { id })
            .getOne();
        if (!user)
            return null;
        return user;
    }
    async registerUser(dto) {
        const user = await this.usersRepository
            .createQueryBuilder("u")
            .insert()
            .into(user_entity_1.Users)
            .values({
            email: dto.email,
            login: dto.login,
            passwordSalt: dto.passwordSalt,
            passwordHash: dto.hashPassword,
            isActiveAccount: false,
            createdAt: new Date().toISOString()
        })
            .returning(["id"])
            .execute();
        return user.raw[0].id;
    }
    async checkCodeConfirmation(code) {
        const user = await this.usersRepository
            .createQueryBuilder("users")
            .leftJoinAndSelect("users.confirmationData", "c")
            .where("c.code = :code", { code })
            .getOne();
        console.log("users", user);
        if (!user)
            return null;
        return { userId: user.id, expirationDate: user.confirmationData.expirationDate, isActiveAccount: user.isActiveAccount };
    }
    async activateAccount(userId) {
        const activeUser = await this.usersRepository
            .createQueryBuilder()
            .update(user_entity_1.Users)
            .set({ isActiveAccount: true })
            .where("id = :id", { id: userId })
            .returning("*")
            .execute();
        return activeUser.raw[0];
    }
    async validateResendingUser(email) {
        const user = await this.usersRepository
            .createQueryBuilder("u")
            .select(["u.isActiveAccount,u.id"]);
        console.log("user", user);
        if (user[0] && !user[0].isActiveAccount)
            return user[0].id;
        return null;
    }
};
exports.UserSqlRepository = UserSqlRepository;
exports.UserSqlRepository = UserSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserSqlRepository);
//# sourceMappingURL=userSql.repository.js.map