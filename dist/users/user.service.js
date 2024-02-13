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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const crypto_service_1 = require("../common/crypto.service");
const superUsers_service_1 = require("../super-users/superUsers.service");
const userSql_repository_1 = require("./userSql.repository");
const mail_manager_1 = require("../common/managers/mail-manager");
const dataConfirmation_repository_1 = require("./dataConfirmation.repository");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(userRepository, suService, userSqlRepository, confirmationDataRepository) {
        this.userRepository = userRepository;
        this.suService = suService;
        this.userSqlRepository = userSqlRepository;
        this.confirmationDataRepository = confirmationDataRepository;
    }
    async createUser(createUserDto) {
        const hash = await crypto_service_1.cryptoService.genHash(createUserDto.password);
        const dtoUser = {
            passwordSalt: hash.salt,
            hashPassword: hash.hash,
            login: createUserDto.login,
            email: createUserDto.email,
        };
        const newUser = await this.userSqlRepository.registerUser(dtoUser);
        const confirmData = await this.confirmationDataRepository.save((0, uuid_1.v4)(), newUser);
        await mail_manager_1.mailManager.registerConfirmation(dtoUser.email, confirmData);
        return;
    }
    async findUsers(params) {
        return this.suService.findAll(params);
    }
    async findById(id) {
        return this.userSqlRepository.findById(id);
    }
    async deleteUser(id) {
        return this.suService.deleteUser(id);
    }
    async validateUser(loginOrEmail, pass) {
        return this.userSqlRepository.validate(loginOrEmail, pass);
    }
    async checkExistUser(email, login) {
        return this.userRepository.checkExistUser(email, login);
    }
    async checkCodeConfirmation(code) {
        const user = await this.userSqlRepository.checkCodeConfirmation(code);
        if (user.userId && !user.isActiveAccount && user.expirationDate >= new Date()) {
            const activateUser = await this.userSqlRepository.activateAccount(user.userId);
            return true;
        }
        return false;
    }
    async validateResendingUser(email) {
        return this.userSqlRepository.validateResendingUser(email);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        superUsers_service_1.SuperUsersService,
        userSql_repository_1.UserSqlRepository,
        dataConfirmation_repository_1.DataConfirmationRepository])
], UserService);
//# sourceMappingURL=user.service.js.map