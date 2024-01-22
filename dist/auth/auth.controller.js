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
const jwt_auth_guard_1 = require("./guards/jwt-auth-guard");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async loginUser(req, res) {
        const credentials = await this.authService.login(req.user._id.toString());
        res.cookie("refreshToken", credentials.refreshToken, { httpOnly: true, secure: true });
        res.status(200).send({ accessToken: credentials.accessToken });
    }
    async resendingEmail(body) {
        const validData = await this.userService.validateResendingUser(body.email);
        if (!validData) {
            throw new common_1.BadRequestException([{ field: "email", message: "invalid data" }]);
        }
        await this.authService.resendingEmail(body.email);
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
        return this.authService.registerUser(createUserDto);
    }
    async registerConfirmation(body) {
        const code = body.code;
        const isConfirmed = await this.userService.checkCodeConfirmation(code);
        if (!isConfirmed)
            throw new common_1.BadRequestException([{ field: "code", message: "invalid data" }]);
        return;
    }
    async authMe(req) {
        if (req.user) {
            const { email, login, _id } = req.user;
            const userId = _id.toString();
            return { email, login, userId };
        }
        throw new common_1.UnauthorizedException();
    }
    async logout(req, res) {
        res.clearCookie("refreshToken");
        res.sendStatus(204);
    }
    async refreshToken(req, res) {
        const user = req.user;
        const credentials = await this.authService.login(user._id.toString());
        res.cookie("refreshToken", credentials.refreshToken, { httpOnly: true, secure: true });
        res.status(200).send({ accessToken: credentials.accessToken });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
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
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authMe", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map