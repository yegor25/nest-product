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
exports.UserSchema = exports.CreateUserDtoType = exports.SortDirection = exports.User = exports.EmailConfirmation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
let EmailConfirmation = class EmailConfirmation {
};
exports.EmailConfirmation = EmailConfirmation;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EmailConfirmation.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], EmailConfirmation.prototype, "isConfirmed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], EmailConfirmation.prototype, "expirationDate", void 0);
exports.EmailConfirmation = EmailConfirmation = __decorate([
    (0, mongoose_1.Schema)()
], EmailConfirmation);
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: new Date().toISOString(),
    }),
    __metadata("design:type", String)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "hashPassword", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "passwordSalt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: EmailConfirmation,
        default: {
            code: "none",
            isConfirmed: true,
            expirationDate: new Date
        }
    }),
    __metadata("design:type", EmailConfirmation)
], User.prototype, "emailConfirmation", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)()
], User);
var SortDirection;
(function (SortDirection) {
    SortDirection["asc"] = "asc";
    SortDirection["desc"] = "desc";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
class CreateUserDtoType {
}
exports.CreateUserDtoType = CreateUserDtoType;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], CreateUserDtoType.prototype, "login", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateUserDtoType.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    __metadata("design:type", String)
], CreateUserDtoType.prototype, "email", void 0);
;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map