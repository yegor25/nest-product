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
exports.SuperUserController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const basic_auth_guard_1 = require("../auth/guards/basic-auth.guard");
const typeorm_2 = require("typeorm");
const superUsers_service_1 = require("./superUsers.service");
const su_schema_1 = require("./su.schema");
let SuperUserController = class SuperUserController {
    constructor(superUsersService, dataSorce) {
        this.superUsersService = superUsersService;
        this.dataSorce = dataSorce;
    }
    async getAllUsers() {
        return this.dataSorce.query(`
    SELECT * from public."Users";
        `);
    }
    async createUser(createUserDto) {
        return this.superUsersService.create(createUserDto);
    }
    async deleteUser(userId) {
        const deletedUser = await this.superUsersService.deleteUser(userId);
        if (!deletedUser)
            throw new common_1.NotFoundException();
        return;
    }
    async getUsers(query) {
        return this.superUsersService.findAll(query);
    }
};
exports.SuperUserController = SuperUserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuperUserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Post)("users"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [su_schema_1.CreateSuDtoType]),
    __metadata("design:returntype", Promise)
], SuperUserController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Delete)('users/:id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuperUserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)("users"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuperUserController.prototype, "getUsers", null);
exports.SuperUserController = SuperUserController = __decorate([
    (0, common_1.Controller)("sa"),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [superUsers_service_1.SuperUsersService,
        typeorm_2.DataSource])
], SuperUserController);
//# sourceMappingURL=superUsers.controller.js.map