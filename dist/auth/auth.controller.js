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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const auth_service_1 = require("./auth.service");
const user_schema_1 = require("../users/user.schema");
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async loginUser(req, body) {
        return this.authService.login(body);
    }
    async resendingEmail(body) {
        const validData = await this.userService.validateResendingUser(body.email);
        if (!validData) {
            throw new common_1.BadRequestException([{ field: "email", message: "invalid data" }]);
        }
        return;
    }
    async register(createUserDto) {
        const existUser = await this.userService.checkExistUser(createUserDto.email, createUserDto.login);
        if (existUser) {
            if (existUser.email === createUserDto.email) {
                throw new common_1.BadRequestException([{ field: "email", message: "already exist" }]);
            }
            else {
                throw new common_1.BadRequestException([{ field: "login", message: "already exist" }]);
            }
        }
        await this.authService.registerUser(createUserDto);
        return;
    }
    async registerConfirmation(body) {
        const code = body.code;
        const isConfirmed = await this.userService.checkCodeConfirmation(code);
        return;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Post)('registration-email-resending'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendingEmail", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.CreateUserDtoType]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Post)('registration-confirmation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerConfirmation", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map