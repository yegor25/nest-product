"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../users/user.service");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const user_repository_1 = require("../users/user.repository");
const dataConfirmation_repository_1 = require("../users/dataConfirmation.repository");
const superUsers_service_1 = require("../super-users/superUsers.service");
const userSql_repository_1 = require("../users/userSql.repository");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/user.schema");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, user_service_1.UserService, jwt_1.JwtService, user_repository_1.UserRepository, dataConfirmation_repository_1.DataConfirmationRepository, superUsers_service_1.SuperUsersService, userSql_repository_1.UserSqlRepository],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema }
            ])
        ]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map