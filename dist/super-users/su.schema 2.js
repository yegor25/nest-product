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
exports.CreateSuDtoType = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const su_validate_email_1 = require("./validators/su.validate-email");
const su_validate_login_1 = require("./validators/su.validate-login");
class CreateSuDtoType {
}
exports.CreateSuDtoType = CreateSuDtoType;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value.trim())),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(10),
    (0, class_validator_1.Validate)(su_validate_login_1.SuValidatorLogin),
    __metadata("design:type", String)
], CreateSuDtoType.prototype, "login", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateSuDtoType.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    (0, class_validator_1.Validate)(su_validate_email_1.SuValidatorEmail),
    __metadata("design:type", String)
], CreateSuDtoType.prototype, "email", void 0);
;
//# sourceMappingURL=su.schema.js.map