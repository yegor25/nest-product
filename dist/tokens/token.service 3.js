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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const token_repository_1 = require("./token.repository");
const tokenSql_repository_1 = require("./tokenSql.repository");
let TokenService = class TokenService {
    constructor(tokenRepository, tokenSqlRepository) {
        this.tokenRepository = tokenRepository;
        this.tokenSqlRepository = tokenSqlRepository;
    }
    async save(userId, token) {
        return this.tokenSqlRepository.save(token, userId);
    }
    async find(userId, token) {
        return this.tokenSqlRepository.findTokenByUserId(userId, token);
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_repository_1.TokenRepository,
        tokenSql_repository_1.TokenSqlRepository])
], TokenService);
//# sourceMappingURL=token.service.js.map