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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const jwt_1 = require("@nestjs/jwt");
const mail_manager_1 = require("../common/managers/mail-manager");
const authHelper_1 = require("./authHelper");
const user_repository_1 = require("../users/user.repository");
const constants_1 = require("./constants");
const dataConfirmation_repository_1 = require("../users/dataConfirmation.repository");
let AuthService = class AuthService {
    constructor(usersService, jwtService, userRepository, dataConfirmationRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.dataConfirmationRepository = dataConfirmationRepository;
    }
    async validateUser(loginOrEmail, pass) {
        const user = await this.usersService.validateUser(loginOrEmail, pass);
        if (user)
            return user;
        return null;
    }
    async login(userId, deviceId) {
        const payload = {
            sub: userId
        };
        const data = {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign({ ...payload, deviceId: deviceId }, { secret: constants_1.jwtConstants.refreshSecret, expiresIn: "20s" })
        };
        return data;
    }
    async registerUser(data) {
        return this.usersService.createUser(data);
    }
    async confirmUser(code) {
        const res = await this.usersService.checkCodeConfirmation(code);
        return res;
    }
    async resendingEmail(email, userId) {
        const confirmationData = authHelper_1.authHelper.confiramtionDataMapper();
        await mail_manager_1.mailManager.registerConfirmation(email, confirmationData.code);
        await this.dataConfirmationRepository.changeCode(confirmationData, userId);
        return;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        user_repository_1.UserRepository,
        dataConfirmation_repository_1.DataConfirmationRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map