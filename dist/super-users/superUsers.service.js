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
exports.SuperUsersService = void 0;
const common_1 = require("@nestjs/common");
const superUsers_repositoru_1 = require("./superUsers.repositoru");
const crypto_service_1 = require("../common/crypto.service");
let SuperUsersService = class SuperUsersService {
    constructor(superUserRepository) {
        this.superUserRepository = superUserRepository;
    }
    async create(dto) {
        const hash = await crypto_service_1.cryptoService.genHash(dto.password);
        const dbDto = {
            email: dto.email,
            login: dto.login,
            passwordSalt: hash.salt,
            hashPassword: hash.hash
        };
        const newUser = await this.superUserRepository.create(dbDto);
        return {
            email: dto.email,
            login: dto.login,
            id: newUser.id,
            createdAt: newUser.createdAt
        };
    }
    async checkEmail(email) {
        return this.superUserRepository.checkByEmail(email);
    }
    async checkLogin(login) {
        return this.superUserRepository.checkByLogin(login);
    }
    async findById(id) {
        return this.superUserRepository.findById(id);
    }
    async deleteUser(id) {
        return this.superUserRepository.deleteUser(id);
    }
    async deleteAll() {
        return this.superUserRepository.deleteAll();
    }
    async findAll(params) {
        return this.superUserRepository.finddAll(params);
    }
};
exports.SuperUsersService = SuperUsersService;
exports.SuperUsersService = SuperUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [superUsers_repositoru_1.SuperUserRepository])
], SuperUsersService);
//# sourceMappingURL=superUsers.service.js.map