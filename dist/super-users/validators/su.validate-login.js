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
exports.SuValidatorLogin = void 0;
const class_validator_1 = require("class-validator");
const superUsers_service_1 = require("../superUsers.service");
const common_1 = require("@nestjs/common");
let SuValidatorLogin = class SuValidatorLogin {
    constructor(suService) {
        this.suService = suService;
    }
    async validate(value) {
        if (!value)
            return false;
        const user = await this.suService.checkLogin(value);
        if (user)
            return false;
        return true;
    }
    defaultMessage(validationArguments) {
        return "invalid login";
    }
};
exports.SuValidatorLogin = SuValidatorLogin;
exports.SuValidatorLogin = SuValidatorLogin = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: "suValidator", async: true }),
    __metadata("design:paramtypes", [superUsers_service_1.SuperUsersService])
], SuValidatorLogin);
//# sourceMappingURL=su.validate-login.js.map