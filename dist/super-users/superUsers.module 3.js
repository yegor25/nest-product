"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperUsersModule = void 0;
const common_1 = require("@nestjs/common");
const superUsers_controller_1 = require("./superUsers.controller");
const superUsers_service_1 = require("./superUsers.service");
const superUsers_repositoru_1 = require("./superUsers.repositoru");
const su_validate_email_1 = require("./validators/su.validate-email");
const su_validate_login_1 = require("./validators/su.validate-login");
let SuperUsersModule = class SuperUsersModule {
};
exports.SuperUsersModule = SuperUsersModule;
exports.SuperUsersModule = SuperUsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [superUsers_controller_1.SuperUserController],
        providers: [superUsers_service_1.SuperUsersService, superUsers_repositoru_1.SuperUserRepository, su_validate_email_1.SuValidatorEmail, su_validate_login_1.SuValidatorLogin],
        exports: [superUsers_service_1.SuperUsersService]
    })
], SuperUsersModule);
//# sourceMappingURL=superUsers.module.js.map