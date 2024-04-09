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
exports.TokenSqlRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const token_entity_1 = require("./token.entity");
let TokenSqlRepository = class TokenSqlRepository {
    constructor(dataSource, tokenRepo) {
        this.dataSource = dataSource;
        this.tokenRepo = tokenRepo;
    }
    async save(token, userId) {
        await this.tokenRepo
            .createQueryBuilder()
            .insert()
            .into(token_entity_1.Tokens)
            .values({ token, userId })
            .execute();
        return;
    }
    async findTokenByUserId(userId, token) {
        const query = await this.tokenRepo
            .createQueryBuilder("t")
            .select()
            .where("t.userId = :userId AND t.token = :token", { userId, token })
            .getOne();
        console.log("query", query);
        if (query)
            return true;
        return false;
    }
};
exports.TokenSqlRepository = TokenSqlRepository;
exports.TokenSqlRepository = TokenSqlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(token_entity_1.Tokens)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], TokenSqlRepository);
//# sourceMappingURL=tokenSql.repository.js.map